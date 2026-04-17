const Admin = require("../models/Admin.model");
const Appointment = require("../models/Appointment.model");
const Doctor = require("../models/Doctor.model");
const Speciality = require("../models/Speciality.model");
const Department = require("../models/Department.model");
const Enquiry = require("../models/Enquiry.model");
const Hospital = require("../models/Hospital.model");
const Blog = require("../models/Blog.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalSpecialities = await Speciality.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const totalHospitals = await Hospital.countDocuments();
    const totalNews = await Blog.countDocuments();
    
    // Unique patients based on phone number
    const uniquePatients = await Appointment.distinct("phone");
    const patientCount = uniquePatients.length;

    const recentAppointments = await Appointment.find().sort({ createdAt: -1 }).limit(6);
    
    const doctorsOnDuty = await Doctor.countDocuments({ status: "Available" });

    // Status breakup
    const statusStats = await Appointment.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalAppointments,
        totalDoctors,
        totalSpecialities,
        totalDepartments,
        totalEnquiries,
        totalHospitals,
        totalNews,
        patientCount,
        recentAppointments,
        doctorsOnDuty,
        statusStats
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // If a new image was uploaded locally
    if (req.file) {
      updates.profilePhoto = `/uploads/${req.file.filename}`;
    }

    // Don't allow password update through this route
    delete updates.password;

    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin || !(await admin.matchPassword(oldPassword))) {
      return res.status(401).json({ success: false, message: "Invalid old password" });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

