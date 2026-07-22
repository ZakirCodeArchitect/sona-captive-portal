import sql from 'mssql';
import config from './env.js';
import logger from '../utils/logger.js';

let pool = null;

export function getDbConfig() {
  return {
    server: config.db.server,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    options: {
      encrypt: config.db.encrypt,
      trustServerCertificate: config.db.trustServerCertificate,
      enableArithAbort: true,
    },
    pool: config.db.pool,
  };
}

export async function getPool() {
  if (pool) return pool;

  pool = await sql.connect(getDbConfig());
  logger.info('Connected to SQL Server', {
    server: config.db.server,
    database: config.db.database,
  });

  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
    logger.info('SQL Server connection pool closed');
  }
}

export { sql };
