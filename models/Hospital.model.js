const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    city: { type: String },
    country: { type: String, default: "India" },
    contact: { type: String },
    image: { type: String },
    description: { type: String },
    accreditations: [{ type: String }],
    specialities: [{ type: String }],
    totalBeds: { type: Number, default: 0 },
    availableBeds: { type: Number, default: 0 },
    departments: { type: Number, default: 0 },
    doctors: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
