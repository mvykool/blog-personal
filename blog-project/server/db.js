import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'Maykol___123!!',
    database: 'blog'
})