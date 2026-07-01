const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// 1. Add Medicine
router.post('/add', async(req, res) => {
    try {
        const { name, expiry, quantity, donorId, imageUrl } = req.body;

        const newMed = new Medicine({
            name,
            expiry,
            quantity,
            donor: donorId,
            imageUrl: imageUrl, // Frontend se aane wali image yahan save ho rahi hai
            status: 'pending'
        });

        await newMed.save();
        res.status(201).json({ message: "Added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Baqi routes (pending, verified, etc.) wese hi rehne dein
router.get('/pending', async(req, res) => {
    try {
        const meds = await Medicine.find({ status: 'pending' }).populate('donor', 'name');
        res.json(meds);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// server/routes/medicine.js mein sirf ye route check karein
router.get('/verified', async(req, res) => {
    try {
        // Hum database se sirf wo medicines mangwa rahe hain jin ka status 'verified' hai
        const meds = await Medicine.find({ status: 'verified' });
        console.log("Verified Medicines found:", meds.length); // Terminal mein count check karne ke liye
        res.json(meds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my-donations/:donorId', async(req, res) => {
    try {
        const meds = await Medicine.find({ donor: req.params.donorId }).sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/verify', async(req, res) => {
    try {
        const { status } = req.body;
        const med = await Medicine.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(med);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;