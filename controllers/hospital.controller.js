const Hospital = require("../models/Hospital.model");

// Get all hospitals with search and filter
exports.getAll = async (req, res) => {
  try {
    const { search, city, isActive } = req.query;
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (city) filter.city = city;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const hospitals = await Hospital.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: hospitals });
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
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });
    res.json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
    try {
      const { isActive } = req.body;
      const hospital = await Hospital.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
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
