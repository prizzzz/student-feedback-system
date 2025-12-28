const User = require('../models/User');
const StudentSubject = require('../models/StudentSubject');
const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

// 1. Get Dashboard Stats
const getStats = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: 'student' });
    const faculty = await User.countDocuments({ role: 'faculty' });
    const subjects = await StudentSubject.countDocuments();
    const feedbacks = await Feedback.countDocuments();

    res.json({
      success: true,
      data: { students, faculty, subjects, feedbacks }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Get User Directory
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Assign Subject
const assignSubject = async (req, res) => {
  try {
    const { classId, subjectName, facultyEmail } = req.body;

    const faculty = await User.findOne({ email: facultyEmail.toLowerCase(), role: 'faculty' });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // Create record without 'student' field
    const subject = await StudentSubject.create({
      classId,
      subjectName,
      faculty: faculty._id
    });

    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 5. Faculty Analytics
const getAnalytics = async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }).select('name');
    
    const performanceData = await Promise.all(facultyList.map(async (f) => {
      const feedbacks = await Feedback.find({ faculty: f._id });
      const avg = feedbacks.length > 0 
        ? (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1)
        : "0.0";
      
      return { _id: f._id, name: f.name, totalFeedbacks: feedbacks.length, avgRating: avg };
    }));

    res.json({ success: true, data: performanceData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// EXPORT ALL
module.exports = { getStats, getUsers, assignSubject, deleteUser, getAnalytics };