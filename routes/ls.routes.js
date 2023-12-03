const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { addLs } = require("../controllers/addLsController");

router.post("/addls", isAuthenticated, addLs);

module.exports = router;