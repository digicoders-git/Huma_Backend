const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDesc: { type: String },
    about: { type: String },
    head: { type: String },
    qualification: { type: String },
    icon: { type: String },
    color: { type: String },
    image: { type: String },
    conditions: [{ type: String }],
    services: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
