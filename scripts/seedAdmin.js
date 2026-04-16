/**
 * Run once to create the first admin account:
 *   node scripts/seedAdmin.js
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const Admin = require("../models/Admin.model");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  await Admin.create({
    name: "Super Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  console.log("Admin created:", process.env.ADMIN_EMAIL);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
