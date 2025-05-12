import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2";

const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL Database!");
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { fullname, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)";
  db.query(query, [fullname, email, mobile, hashedPassword], (err, result) => {
    if (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ error: "Signup failed" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Login Route
router.post("/login", async (req, res) => {
  const { emailOrMobile, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? OR mobile = ?",
    [emailOrMobile, emailOrMobile],
    async (err, results) => {
      if (err) {
        console.error("Login DB error:", err);
        return res.status(500).json({ error: "Login failed" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      res.status(200).json({ message: "Login successful" });
    }
  );
});

export default router;
