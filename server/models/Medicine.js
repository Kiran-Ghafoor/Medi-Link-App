const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expiry: { type: Date, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Medicine', medicineSchema);