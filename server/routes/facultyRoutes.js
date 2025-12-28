const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// Ensure these names are identical to the controller exports
const { getAssignedSubjects, getFeedbacks } = require('../controllers/facultyController');

// Line 7 is likely one of these. 
// If getFeedbacks is undefined, router.get will throw the TypeError.
router.get('/subjects', protect, getAssignedSubjects);
router.get('/feedbacks', protect, getFeedbacks);

module.exports = router;