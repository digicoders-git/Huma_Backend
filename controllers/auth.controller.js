const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    let profilePhoto = "";
    if (req.file) {
      profilePhoto = `/uploads/${req.file.filename}`;
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      phone,
      profilePhoto,
    });

    res.status(201).json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, profilePhoto: admin.profilePhoto, phone: admin.phone },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email, profilePhoto: admin.profilePhoto },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
