import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

export const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
});


console.log('Database connected successfully');