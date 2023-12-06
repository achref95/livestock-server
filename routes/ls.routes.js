const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { addLs, getLs } = require("../controllers/addLsController");

router.get("/getls", isAuthenticated, getLs);
router.post("/addls", isAuthenticated, addLs);

module.exports = router;