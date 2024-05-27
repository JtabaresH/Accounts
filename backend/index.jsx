const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
  res.json(result.rows[0]);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running');
});
