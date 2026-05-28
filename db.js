import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { MySQLHOST, MySQLPORT, MySQLUSER, MySQLPASSWORD, MySQLDATABASE } = process.env;

const pool = mysql.createPool({
    host: MySQLHOST,
    port: MySQLPORT || 3306,
    user: MySQLUSER,
    password: MySQLPASSWORD,
    database: MySQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: false
});

export const sql = pool;