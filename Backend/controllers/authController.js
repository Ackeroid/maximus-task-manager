const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: "Email already used" });
    }

    res.status(201).json({
      message: "Account created",
      userId: this.lastID
    });
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], function (err, user) {
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const match = bcrypt.compareSync(password, user.password_hash);

    if (!match) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      name: user.name
    });
  });
}

module.exports = {
  registerUser,
  loginUser
};