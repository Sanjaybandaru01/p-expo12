const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "199189",
  database: "renthub"
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected...");
  }
});

// REGISTER API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      res.send("Email already exists");
    } else {
      res.send("Registered Successfully");
    }
  });
});

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (result.length > 0) {
      res.send("Login Successful");
    } else {
      res.send("Invalid Email or Password");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});