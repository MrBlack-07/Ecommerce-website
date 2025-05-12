import { createPool } from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullname, email, mobile, password } = req.body;
    const connection = await pool.getConnection();

    try {
      // Check if email or mobile already exists
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE email = ? OR mobile = ?',
        [email, mobile]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Email or mobile number already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const [result] = await connection.execute(
        'INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)',
        [fullname, email, mobile, hashedPassword]
      );

      res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 