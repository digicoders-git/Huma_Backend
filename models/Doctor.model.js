const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Female', 'Male', 'Other'], default: 'Male' },
    dob: { type: Date },
    doctorId: { type: String },
    about: { type: String },
    
    // Contact Info
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    emergencyName: { type: String },
    emergencyPhone: { type: String },
    
    // Professional Info
    department: { type: String },
    specialization: { type: String },
    workType: { type: String, enum: ['Full Time', 'Part Time'], default: 'Full Time' },
    startDate: { type: Date },
    salary: { type: String },
    
    // Licenses & Certifications
    licenseNumber: { type: String },
    licenseExpiry: { type: Date },
    certifications: [{ type: String }], // Array of URLs or paths
    avatar: { type: String }, // Doctor photo path
    
    // Schedule Configuration
    minAppt: { type: Number, default: 1 },
    maxAppt: { type: Number, default: 18 },
    schedule: {
      type: Map,
      of: new mongoose.Schema({
        checked: { type: Boolean, default: false },
        start: { type: String },
        end: { type: String }
      }, { _id: false }),
      default: {}
    },
    
    // Card Display statuses
    status: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
