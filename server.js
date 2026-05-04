const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://huma-website-opal.vercel.app",
      "https://huma-admin-panel.vercel.app",
      "https://admin.humaneurologycentre.com",
      "https://www.humaneurologycentre.com",
      "https://humaneurologycentre.com"
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for local uploads
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Additional middleware to ensure images are accessible across origins
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


// Routes
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/blog", require("./routes/blog.routes"));
app.use("/api/doctor", require("./routes/doctor.routes"));
app.use("/api/hospital", require("./routes/hospital.routes"));
app.use("/api/speciality", require("./routes/speciality.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/api/video", require("./routes/video.routes"));
app.use("/api/enquiry", require("./routes/enquiry.routes"));
app.use("/api/free-consultation", require("./routes/freeConsultation.routes"));
app.use("/api/appointment", require("./routes/appointment.routes"));
app.use("/api/department", require("./routes/department.routes"));
app.use("/api/testimonial", require("./routes/testimonial.routes"));
app.use("/api/announcement", require("./routes/announcement.routes"));


// Health check
app.get("/", (req, res) => res.json({ message: "Healing Escape API running" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 
