const requireAuth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// GET all students (PROTECTED with requireAuth)
// CHANGED: added populate() with field selection (Task 1)
router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find()
            .populate('createdBy', 'email role');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// NEW: aggregation endpoint (Task 2)
// GET /api/students/stats/by-creator
router.get('/stats/by-creator', requireAuth, async (req, res) => {
    try {
        const stats = await Student.aggregate([
            { $match: { isActive: true } },
            { $group: {
                _id: '$createdBy',
                totalStudents: { $sum: 1 },
                averageAge: { $avg: '$age' }
            } },
            { $sort: { totalStudents: -1 } },
            { $limit: 5 }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create student
// CHANGED: now needs a token, and saves who created the student
router.post('/', requireAuth, async (req, res) => {
    try {
        const newStudent = await Student.create({
            ...req.body,
            createdBy: req.user.userId
        });
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE student (PROTECTED with requireAuth)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;