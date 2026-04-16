const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    country: { type: String },
    message: { type: String },
    treatment: { type: String },
    status: { type: String, enum: ["pending", "contacted", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
