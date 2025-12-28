const mongoose = require('mongoose');

const studentSubjectSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  subjectName: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Remove 'required: true' from student if it exists, 
  // or remove the field entirely if you only assign by Class
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

module.exports = mongoose.model('StudentSubject', studentSubjectSchema);