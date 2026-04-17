const Department = require("../models/Department.model");

exports.getAll = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: "Department not found" });
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    
    // Handle array fields from FormData
    if (typeof req.body.conditions === 'string') {
        req.body.conditions = req.body.conditions.split(',').map(s => s.trim()).filter(s => s !== '');
    }
    if (typeof req.body.services === 'string') {
        req.body.services = req.body.services.split(',').map(s => s.trim()).filter(s => s !== '');
    }

    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;

    if (typeof req.body.conditions === 'string') {
        req.body.conditions = req.body.conditions.split(',').map(s => s.trim()).filter(s => s !== '');
    }
    if (typeof req.body.services === 'string') {
        req.body.services = req.body.services.split(',').map(s => s.trim()).filter(s => s !== '');
    }

    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ success: false, message: "Department not found" });
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
