import { getPool, sql } from '../config/database.js';
import config from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';

function getPktDayBounds() {
  const now = new Date();
  const pktFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: config.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const pktDate = pktFormatter.format(now);
  const start = new Date(`${pktDate}T00:00:00+05:00`);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}

export async function findDuplicateToday(cnic) {
  const pool = await getPool();
  const { start, end } = getPktDayBounds();

  const result = await pool
    .request()
    .input('cnic', sql.VarChar(15), cnic)
    .input('start', sql.DateTime2, start)
    .input('end', sql.DateTime2, end)
    .query(`
      SELECT TOP 1 VisitorID, RegistrationTime
      FROM dbo.VisitorRegistrations
      WHERE CNIC = @cnic
        AND RegistrationTime >= @start
        AND RegistrationTime < @end
    `);

  return result.recordset[0] || null;
}

export async function createRegistration(data) {
  const pool = await getPool();
  const registrationTime = new Date();

  try {
    const result = await pool
      .request()
      .input('cnic', sql.VarChar(15), data.cnic)
      .input('fullName', sql.NVarChar(100), data.fullName)
      .input('phoneNumber', sql.VarChar(15), data.phoneNumber)
      .input('company', sql.NVarChar(150), data.company)
      .input('ipAddress', sql.VarChar(45), data.ipAddress)
      .input('macAddress', sql.VarChar(17), data.macAddress)
      .input('registrationTime', sql.DateTime2, registrationTime)
      .query(`
        INSERT INTO dbo.VisitorRegistrations
          (CNIC, FullName, PhoneNumber, Company, IPAddress, MACAddress, RegistrationTime, CreatedAt)
        OUTPUT INSERTED.VisitorID, INSERTED.RegistrationTime
        VALUES
          (@cnic, @fullName, @phoneNumber, @company, @ipAddress, @macAddress, @registrationTime, SYSUTCDATETIME())
      `);

    return result.recordset[0];
  } catch (error) {
    if (error.number === 2627 || error.number === 2601) {
      throw new AppError(
        'This CNIC has already been registered today.',
        409,
        'DUPLICATE_REGISTRATION',
      );
    }
    throw error;
  }
}

export async function checkDatabaseHealth() {
  const pool = await getPool();
  const result = await pool.request().query('SELECT 1 AS healthy');
  return result.recordset[0]?.healthy === 1;
}
