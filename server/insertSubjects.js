const mongoose = require('mongoose');
const StudentSubject = require('./models/StudentSubject');
const User = require('./models/User');

// Replace this with your actual Atlas connection string
const mongoURI = 'mongodb+srv://admin:admin_2025@cluster0.9auxztg.mongodb.net/?appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function insertDummySubjects() {
  const student = await User.findOne({ email: 'priyanka@example.com' });
  const faculty1 = await User.findOne({ email: 'smith@faculty.com' });

  if (!student || !faculty1) {
    console.log('Student or Faculty not found');
    process.exit(1);
  }

  const subjects = [
    { student: student._id, subjectName: 'Math', faculty: faculty1._id },
    { student: student._id, subjectName: 'Physics', faculty: faculty1._id },
  ];

  await StudentSubject.insertMany(subjects);
  console.log('Dummy student-subject data inserted');
  process.exit();
}

insertDummySubjects();
