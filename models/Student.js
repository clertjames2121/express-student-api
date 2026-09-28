const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    isActive: Boolean
});

module.exports = mongoose.model('Student', studentSchema);