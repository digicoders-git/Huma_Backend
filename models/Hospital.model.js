const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    city: { type: String },
    country: { type: String, default: "India" },
    image: { type: String },
    description: { type: String },
    accreditations: [{ type: String }],
    specialities: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
