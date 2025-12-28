// controllers/feedbackController.js
const Feedback = require('../models/Feedback'); // <--- ADD THIS LINE

const createFeedback = async (req, res) => {
  try {
    const { facultyId, courseName, rating, comment, classId } = req.body;
    const studentId = req.user.id;

    if (!facultyId || !courseName || !rating || !comment || !classId) {
      return res.status(400).json({
        message: 'Please provide all required fields including classId',
      });
    }

    const feedback = await Feedback.create({
      student: studentId,
      faculty: facultyId,
      courseName,
      rating,
      comment,
      classId, 
    });

    res.status(201).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFeedback };