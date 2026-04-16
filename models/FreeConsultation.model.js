const mongoose = require("mongoose");

const freeConsultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String },
    treatment: { type: String },
    preferredDate: { type: Date },
    message: { type: String },
    status: { type: String, enum: ["pending", "contacted", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FreeConsultation", freeConsultationSchema);
