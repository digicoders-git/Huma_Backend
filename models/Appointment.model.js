const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String }, // e.g. #PT-2035-001
    phone: { type: String, required: true },
    doctor: { type: String, required: true },
    specialty: { type: String },
    type: { type: String, enum: ['Consultation', 'Follow-up', 'Surgery', 'Telemedicine'], default: 'Consultation' },
    notes: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Ongoing', 'Canceled'], default: 'Scheduled' },
    avatar: { type: String } // optional for UI avatar
  },
  { timestamps: true }
);

// auto-generate code before saving if not present
appointmentSchema.pre('save', function(next) {
  if (!this.code) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    this.code = `#PT-${year}-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
