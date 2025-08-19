const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testdb"
});

connection.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// ❌ Vulnerable Login Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Dangerous string concatenation (SQL Injection possible)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("Database error");
      return;
    }
    if (results.length > 0) {
      res.send("Login successful!");
    } else {
      res.send("Invalid credentials");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
