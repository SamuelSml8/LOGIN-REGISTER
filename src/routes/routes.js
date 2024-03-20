const express = require("express");
const router = express.Router();
const {
  registerEmplooye,
  loginEmplooye,
} = require("../controllers/emplooyeController.js");

router.post("/register", registerEmplooye);
router.post("/login", loginEmplooye);

module.exports = router;
