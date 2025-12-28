const StudentSubject = require('../models/StudentSubject');
const User = require('../models/User');

// GET subjects for logged-in student
const getStudentSubjects = async (req, res) => {
  try {
    const { classId } = req.user;

    if (!classId) {
      return res.status(400).json({ message: 'Student has no class assigned' });
    }

    const subjects = await StudentSubject
      .find({ classId })
      .populate('faculty', 'name email');

    res.json({
      success: true,
      count: subjects.length,
      data: subjects,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentSubjects, // ✅ MUST be exported
};
