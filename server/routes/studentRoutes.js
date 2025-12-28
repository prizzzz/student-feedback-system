const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getStudentSubjects } = require('../controllers/studentController');

router.get('/subjects', protect, getStudentSubjects);

module.exports = router;
