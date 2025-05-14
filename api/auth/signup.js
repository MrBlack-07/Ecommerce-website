import pool from '../../lib/db.js';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullname, email, mobile, password } = req.body;

  try {
    // Check if user already exists
    const { rows: existingUsers } = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR mobile = $2',
      [email, mobile]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      'INSERT INTO users (fullname, email, mobile, password) VALUES ($1, $2, $3, $4) RETURNING id, fullname, email, mobile',
      [fullname, email, mobile, hashedPassword]
    );

    return res.status(201).json({
      message: 'User registered successfully',
      user: rows[0]
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
} 