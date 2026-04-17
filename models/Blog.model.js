const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    introduction: { type: String },
    excerpt: { type: String },
    coverImage: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    isPublished: { type: Boolean, default: false },
    author: { type: String },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
