const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const {
  registerEmplooye,
  loginEmplooye,
} = require("../controllers/emplooyeController.js");

router.post("/register", registerEmplooye);
router.post("/login", loginEmplooye);

module.exports = router;
