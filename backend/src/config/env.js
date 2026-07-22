import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

function requireEnv(name, defaultValue) {
  const value = process.env[name] ?? defaultValue;
  if ((value === undefined || value === '') && isProduction) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3001),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL || 'info',
  timezone: process.env.TIMEZONE || 'Asia/Karachi',
  db: {
    server: requireEnv('DB_SERVER', 'localhost'),
    database: requireEnv('DB_DATABASE', 'SonaTowerGuestPortal'),
    user: requireEnv('DB_USER', 'portal_app_user'),
    password: requireEnv('DB_PASSWORD', ''),
    port: Number(process.env.DB_PORT || 1433),
    encrypt: process.env.DB_ENCRYPT !== 'false',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    pool: {
      max: Number(process.env.DB_POOL_MAX || 10),
      min: Number(process.env.DB_POOL_MIN || 0),
      idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT || 30000),
    },
  },
};

export default config;
