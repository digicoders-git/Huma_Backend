const Appointment = require("../models/Appointment.model");

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const { doctor } = req.query;
    const filter = {};
    if (doctor) filter.doctor = doctor;
    
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single appointment
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an appointment (can be used for general updates)
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update only appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Scheduled', 'Completed', 'Ongoing', 'Canceled'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Bulk update status
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No appointment IDs provided" });
    }
    if (!['Scheduled', 'Completed', 'Ongoing', 'Canceled'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    await Appointment.updateMany(
      { _id: { $in: ids } },
      { status }
    );

    res.status(200).json({ success: true, message: "Statuses updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk delete appointments
exports.bulkDeleteAppointments = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No appointment IDs provided" });
    }

    await Appointment.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ success: true, message: "Appointments deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
