const router = require("express").Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment
} = require("../controllers/appointment.controller");

// Optionally use protect middleware if you want to secure these endpoints for admin only
// const { protect } = require("../middleware/auth.middleware");

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

module.exports = router;
