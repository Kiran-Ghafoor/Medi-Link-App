const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
// Login Route
// Login Route
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email doesn't exist!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password Try Again!" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        // YAHAN DHYAN DEIN: user._id ko id bana kar bhejna hai
        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;