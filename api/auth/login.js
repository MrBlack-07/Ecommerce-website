import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { emailOrMobile, password } = req.body;

    // Connect to MySQL
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Check if user exists
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR mobile = ?',
      [emailOrMobile, emailOrMobile]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found!' });
    }

    // Verify password
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password!' });
    }

    db.end();
    return res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}