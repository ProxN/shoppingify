export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PASS = process.env.DB_PASS || 'postgres';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'postgres';

export const PORT = process.env.PORT || 5000;
export const PROD = process.env.NODE_ENV === 'production';

export const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  MAIL_HOST,
  MAIL_PASS,
  MAIL_USER,
} = process.env;
