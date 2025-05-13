import express from "express";
import bcrypt from "bcrypt";
import pool from "../lib/db.js";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { fullname, email, mobile, password } = req.body;
  
  try {
    // Check if user already exists
    const { rows: existingUsers } = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR mobile = $2',
      [email, mobile]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      'INSERT INTO users (fullname, email, mobile, password) VALUES ($1, $2, $3, $4) RETURNING id, fullname, email, mobile',
      [fullname, email, mobile, hashedPassword]
    );

    res.status(201).json({ 
      message: "User registered successfully",
      user: rows[0]
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { emailOrMobile, password } = req.body;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR mobile = $2',
      [emailOrMobile, emailOrMobile]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
      message: "Login successful",
      user: userWithoutPassword
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
