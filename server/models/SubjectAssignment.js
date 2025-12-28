const mongoose = require('mongoose');

/**
 * SubjectAssignment Schema
 * Maps a specific subject within a class to a designated faculty member.
 */
const SubjectAssignmentSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: [true, "Class ID is required"],
      trim: true,
    },
    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Faculty assignment is required"],
    },
  },
  {
    // Enables createdAt and updatedAt fields automatically
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('SubjectAssignment', SubjectAssignmentSchema);