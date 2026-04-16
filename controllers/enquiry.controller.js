const Enquiry = require("../models/Enquiry.model");

exports.create = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    const total = await Enquiry.countDocuments(filter);
    res.json({ success: true, data: enquiries, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkRemove = async (req, res) => {
  try {
    const { ids } = req.body;
    await Enquiry.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Enquiries deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;
    await Enquiry.updateMany({ _id: { $in: ids } }, { $set: { status } });
    res.json({ success: true, message: "Enquiries updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
