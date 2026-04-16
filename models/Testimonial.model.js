const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    rating: { type: Number, default: 5 },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
