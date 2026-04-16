const Admin = require("../models/Admin.model");

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
      updates.profilePhoto = `/public/uploads/admins/${req.file.filename}`;
    }

    // Don't allow password update through this route
    delete updates.password;

    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
