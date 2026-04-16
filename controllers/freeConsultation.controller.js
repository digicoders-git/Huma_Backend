const FreeConsultation = require("../models/FreeConsultation.model");

exports.create = async (req, res) => {
  try {
    const consultation = await FreeConsultation.create(req.body);
    res.status(201).json({ success: true, message: "Consultation request submitted", data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const consultations = await FreeConsultation.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await FreeConsultation.countDocuments(filter);
    res.json({ success: true, data: consultations, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const consultation = await FreeConsultation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
