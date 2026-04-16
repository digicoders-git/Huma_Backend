const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    whatIs: { type: String },
    whenRecommended: [{ type: String }],
    costRange: { type: String, default: "Contact for Price" },
    image: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Speciality", specialitySchema);
