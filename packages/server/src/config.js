import dotenv from 'dotenv';

dotenv.config();
export const port = process.env.PORT || 3001;
export const mode = process.env.NODE_ENV || 'development';
export default process.env;
export const { DATABASE_URL } = process.env;
export const { REDIS_URL } = process.env;
export const { JWT_SECRET } = process.env;
