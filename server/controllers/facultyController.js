const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
const StudentSubject = require('../models/StudentSubject');

const getAssignedSubjects = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const subjects = await StudentSubject.find({ faculty: facultyId });
        res.json({ success: true, data: subjects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getFeedbacks = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const { classId, subjectName } = req.query;

        // Query by faculty ID and courseName
        const query = { 
            faculty: new mongoose.Types.ObjectId(facultyId),
            courseName: subjectName 
        };

        let feedbacks = await Feedback.find(query)
            .populate('student', 'name classId')
            .sort({ createdAt: -1 });

        // Filter by classId after fetching
        if (classId) {
            feedbacks = feedbacks.filter(fb => fb.student && fb.student.classId === classId);
        }

        res.json({ success: true, data: feedbacks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// CRITICAL: Make sure both names match exactly what you use in the routes
module.exports = { 
    getAssignedSubjects, 
    getFeedbacks 
};