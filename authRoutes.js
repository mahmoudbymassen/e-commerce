const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
      const { nom_user, email, password } = req.body;
      console.log('Request Body:', req.body); 
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ nom_user, email, password: hashedPassword });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error("Error in /register:", err);
      res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { nom_user, password } = req.body; 
        const user = await User.findOne({ nom_user }); 
        if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, nom_user: user.nom_user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;