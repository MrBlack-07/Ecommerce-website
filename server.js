import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Root@12345",
  database: process.env.DB_NAME || "ecommerce_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// Search route
app.get("/api/search", (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.json([]);
  }

  const query = `
    SELECT id, name, price, image 
    FROM products 
    WHERE name LIKE ? OR description LIKE ?
    LIMIT 5
  `;
  const searchPattern = `%${searchQuery}%`;

  db.query(query, [searchPattern, searchPattern], (err, results) => {
    if (err) {
      console.error("Search error:", err);
      return res.status(500).json({ error: "Search failed" });
    }
    res.json(results);
  });
});

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  const { fullname, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)";

  db.query(query, [fullname, email, mobile, hashedPassword], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User registered successfully!" });
  });
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { emailOrMobile, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? OR mobile = ?";
  db.query(query, [emailOrMobile, emailOrMobile], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found!" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password!" });
    }

    res.json({ message: "Login successful!" });
  });
});

// Root
app.get("/", (req, res) => {
  res.send("Welcome to the Ecommerce API!");
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});