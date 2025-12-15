const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
const port = 5001;


app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));


app.get('/db', (req, res) => {
  res.json({
    message: 'Database connected successfully!',
    status: 'success'
  });
});

app.post('/adduser', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertId
    });
  });
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
