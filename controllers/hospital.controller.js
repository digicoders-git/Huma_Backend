const Hospital = require("../models/Hospital.model");

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, city } = req.query;
    const filter = { isActive: true };
    if (city) filter.city = city;

    const hospitals = await Hospital.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Hospital.countDocuments(filter);
    res.json({ success: true, data: hospitals, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });
    res.json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });
    res.json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Hospital deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
