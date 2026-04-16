const router = require("express").Router();
const { login, register } = require("../controllers/auth.controller");
const localUpload = require("../config/localUpload");

router.post("/register", localUpload.single("profilePhoto"), register);
router.post("/login", login);

module.exports = router;
