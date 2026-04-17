const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, enum: ['News', 'Offer', 'Event', 'Alert'], default: 'News' },
    link: { type: String }, // Optional link to a page
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
