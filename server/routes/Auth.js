const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ FIXED: Missing router declaration
const router = express.Router();
const JWT_SECRET = "change_this_secret";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    console.warn("authMiddleware: no Authorization header");
    return res.status(401).json({ message: "No token" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.warn("authMiddleware: bad header format:", header);
    return res.status(401).json({ message: "Invalid auth header" });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ✅ SIGNUP (matches frontend /api/auth/signup)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, role });
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      role: user.role, 
      id: user._id, 
      name: user.name 
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ LOGIN (matches frontend /api/auth/login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash || user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      role: user.role,
      id: user._id,
      name: user.name 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;
