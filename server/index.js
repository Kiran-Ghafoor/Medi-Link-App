const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- ZAROORI SETTING: Image size ki limit barhana ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cors());

// Debugging Middleware: Terminal mein har request show hogi
app.use((req, res, next) => {
    console.log(`${req.method} request received at: ${req.url}`);
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/medicine', require('./routes/medicine')); // Plural 'medicines' use karein

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));