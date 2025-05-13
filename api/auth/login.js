import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { emailOrMobile, password } = req.body;
  if (!emailOrMobile || !password) {
    return res.status(400).json({ error: 'Email/mobile and password are required.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, fullname, email, mobile, password FROM users WHERE email = $1 OR mobile = $2',
      [emailOrMobile, emailOrMobile]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    delete user.password;
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
} 