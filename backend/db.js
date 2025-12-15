// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      
  port: 3307,             
  user: 'root',
  password: '1234',
  database: 'user'        
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
