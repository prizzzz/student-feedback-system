# 🎓 Student Feedback System

A professional, high-impact full-stack web application designed to empower academic growth through transparent and meaningful feedback loops.

## 🚀 Features

- **Role-Based Access Control**: Secure login portals for Students, Faculty, and Administrators with role-locking validation.
- **Admin Management**: Full CRUD operations for users, classes, and subjects.
- **Dynamic Feedback Loop**: Students can rate and review courses; data is automatically linked to specific Class IDs.
- **Real-time Status**: Live system monitoring and analytics dashboard.
- **Responsive Design**: Modern UI built with a professional slate and indigo aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React.js, Lucide-React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Security**: JSON Web Tokens (JWT) & Environment Variable protection

## 📦 Installation & Local Setup

### 1. Clone the repository
git clone [https://github.com/prizzzz/student-feedback-system.git]
cd student-feedback-system

### 2. Configure the Backend
# Navigate to server folder
cd server
npm install

Create a .env file in the server directory and add your credentials:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:
node server.js

### 3. Configure the Frontend
# Navigate to client folder
cd ../client
npm install
npm start

## 🛡️ Security Note
This project utilizes .env files to protect sensitive data like MongoDB connection strings and JWT secrets. Ensure that your .env is listed in your .gitignore before pushing to any public repository.

## 📄 License
This project is open-source and available under the MIT License.
