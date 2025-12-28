const express = require('express');
const router = express.Router();
const { 
  getStats, getUsers, assignSubject, deleteUser, getAnalytics 
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);
router.get('/users', protect, getUsers);
router.get('/analytics', protect, getAnalytics);
router.post('/assign-subject', protect, assignSubject);
router.delete('/user/:id', protect, deleteUser);

module.exports = router;