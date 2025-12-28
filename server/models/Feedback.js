const mongoose = require('mongoose');

// Define the shape of the Feedback document
const feedbackSchema = new mongoose.Schema({
  // Reference to the Student who wrote the feedback
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  // Reference to the Faculty member being reviewed
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseName: {
    type: String,
    required: [true, 'Please add the course name'],
    trim: true,
  },
  // Added classId to match controller and frontend logic
  classId: {
    type: String,
    required: [true, 'Class ID is required to link feedback to a specific batch'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating between 1 and 5'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;