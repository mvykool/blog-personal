import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maykol___123!!',
    database: 'blog'
})