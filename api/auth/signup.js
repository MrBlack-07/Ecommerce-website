import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { fullname, email, mobile, password } = req.body;
  if (!fullname || !email || !mobile || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    // Check for existing user
    const { rows: existing } = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR mobile = $2',
      [email, mobile]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (fullname, email, mobile, password) VALUES ($1, $2, $3, $4)',
      [fullname, email, mobile, hashedPassword]
    );
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
} 