const Doctor = require("../models/Doctor.model");

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, status } = req.query;
    const filter = { isActive: true };
    if (department) filter.department = department;
    if (status) filter.status = status;

    const doctors = await Doctor.find(filter)
      .sort({ createdAt: -1 });
    // returning all for now as admin panel handles it, or map pagination
    
    // total count
    const total = await Doctor.countDocuments(filter);
    res.json({ success: true, data: doctors, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const processFilesAndBody = (req) => {
  if (req.body.schedule && typeof req.body.schedule === 'string') {
    try { req.body.schedule = JSON.parse(req.body.schedule); } catch (e) {}
  }
  
  if (req.files) {
    if (req.files.avatar && req.files.avatar.length > 0) {
      req.body.avatar = `/uploads/${req.files.avatar[0].filename}`;
    }
    if (req.files.certifications && req.files.certifications.length > 0) {
      req.body.certifications = req.files.certifications.map(file => `/uploads/${file.filename}`);
    }
  }
};

exports.create = async (req, res) => {
  try {
    processFilesAndBody(req);
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    processFilesAndBody(req);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    // await Doctor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Doctor marked as inactive (deleted)" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
