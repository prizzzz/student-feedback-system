const mongoose = require('mongoose');
const User = require('./models/User'); 
const Feedback = require('./models/Feedback'); 
const StudentSubject = require('./models/StudentSubject'); 

require('dotenv').config();

const seedDB = async () => {
  try {
    // Connect using the URI in the .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // 1. Clear existing data to avoid duplicates or ID conflicts
    await User.deleteMany({});
    await Feedback.deleteMany({});
    await StudentSubject.deleteMany({});
    console.log("Database cleared.");

    // 2. Create Faculty Users
    const profSmith = await User.create({
      name: "Prof. Smith",
      email: "smith@faculty.com",
      password: "123456",
      role: "faculty",
      classId: null
    });

    const profAnderson = await User.create({
      name: "Prof. Anderson",
      email: "anderson@faculty.com",
      password: "123456",
      role: "faculty",
      classId: null
    });

    // 3. Create Student and Admin
    const johnDoe = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      role: "student",
      classId: "ECS-2025"
    });

    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
      classId: null
    });

    // 4. Create Student-Subject Assignments (Linking Subjects to Faculty)
    await StudentSubject.insertMany([
      { classId: "ECS-2025", subjectName: "Math", faculty: profSmith._id },
      { classId: "ECS-2025", subjectName: "DSA", faculty: profSmith._id },
      { classId: "CS-2025", subjectName: "DSA", faculty: profAnderson._id },
      { classId: "CS-2025", subjectName: "C++", faculty: profAnderson._id },
      { classId: "ECS-2025", subjectName: "C++", faculty: profAnderson._id }
    ]);

    // 5. Create initial Feedback entries
    await Feedback.create({
      student: johnDoe._id,
      faculty: profSmith._id,
      courseName: "Math",
      rating: 5,
      comment: "Very clear explanation",
      classId: "ECS-2025"
    });

    console.log("-----------------------------------------");
    console.log("✅ DATABASE SEEDED SUCCESSFULLY");
    console.log("-----------------------------------------");
    console.log("Login Credentials:");
    console.log("Student: john@example.com / 123456");
    console.log("Admin: admin@example.com / 123456");
    console.log("Faculty: smith@faculty.com / 123456");
    console.log("-----------------------------------------");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();