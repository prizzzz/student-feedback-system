const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password, // Note: In a real app, hash this before saving
      role,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // 1. Get role from request

    // 2. Query for email AND role to prevent role-hopping
    const user = await User.findOne({ email, role });

    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user._id, role: user.role, classId: user.classId || null },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          classId: user.classId || null,
        },
      });
    } else {
      // 3. Return a specific error if credentials or role don't match
      res.status(401).json({ 
        message: user ? `Invalid password for ${role} role` : `User not found with ${role} role` 
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};