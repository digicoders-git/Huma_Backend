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
    city: { type: String, default: "Lucknow" },
    emergencyName: { type: String },
    emergencyPhone: { type: String },
    
    // Professional Info
    department: { type: String },
    designation: { type: String, default: "Senior Consultant" },
    qualification: { type: String, default: "MBBS, MD" },
    specialization: { type: String },
    workType: { type: String, enum: ['Full Time', 'Part Time'], default: 'Full Time' },
    startDate: { type: Date },
    experience: { type: Number },
    expertise: [{ type: String }],
    procedures: [{ type: String }],
    whyChoose: [{ type: String }],
    salary: { type: String },
    consultationFee: { type: Number, default: 500 },
    
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
