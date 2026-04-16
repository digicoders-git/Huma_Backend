const Speciality = require("../models/Speciality.model");

exports.getAll = async (req, res) => {
  try {
    const specialities = await Speciality.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: specialities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const speciality = await Speciality.findById(req.params.id);
    if (!speciality) return res.status(404).json({ success: false, message: "Speciality not found" });
    res.json({ success: true, data: speciality });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;
    const speciality = await Speciality.create(req.body);
    res.status(201).json({ success: true, data: speciality });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;
    const speciality = await Speciality.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!speciality) return res.status(404).json({ success: false, message: "Speciality not found" });
    res.json({ success: true, data: speciality });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Speciality.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Speciality deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
