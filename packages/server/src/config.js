import dotenv from 'dotenv';

dotenv.config();
export const port = process.env.PORT || 3001;
export const mode = process.env.NODE_ENV || 'development';
export default process.env;
