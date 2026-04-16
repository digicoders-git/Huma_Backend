const Gallery = require("../models/Gallery.model");

exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const galleries = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: galleries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  console.log("Gallery Create Request Body:", req.body);
  console.log("Gallery Create Request File:", req.file);
  try {
    if (req.file) {
      req.body.image = `public/uploads/admins/${req.file.filename}`;
    }
    const gallery = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    console.error("Gallery Create Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `public/uploads/admins/${req.file.filename}`;
    }
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
