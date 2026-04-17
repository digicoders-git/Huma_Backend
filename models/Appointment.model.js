const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String }, // e.g. #PT-2035-001
    phone: { type: String, required: true },
    doctor: { type: String }, // Optional for quick appointments
    specialty: { type: String }, // Can be used for Department
    department: { type: String }, // Added for clarity
    type: { type: String, enum: ['Consultation', 'Follow-up', 'Surgery', 'Telemedicine', 'Quick Appointment'], default: 'Consultation' },
    notes: { type: String },
    date: { type: String, required: true },
    time: { type: String }, // Optional for quick appointments
    status: { type: String, enum: ['Scheduled', 'Completed', 'Ongoing', 'Canceled', 'Pending'], default: 'Pending' },
    fees: { type: Number, default: 500 },
    avatar: { type: String } // optional for UI avatar
  },
  { timestamps: true }
);

// auto-generate code before saving if not present
appointmentSchema.pre('save', function(next) {
  if (!this.code) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.code = `#PT-${year}-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
