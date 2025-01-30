require('dotenv').config(); // .env file ko load karne ke liye
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Database Connection Failed! Error: ', err);
  } else {
    console.log('Database Connected Successfully!');
  }
});

module.exports = db;
