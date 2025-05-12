import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullname, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MySQL
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Insert user into database
    await db.execute(
      'INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)',
      [fullname, email, mobile, hashedPassword]
    );

    db.end(); // Close connection
    return res.status(200).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}