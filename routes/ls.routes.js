const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { addLs, getLs, getOne } = require("../controllers/addLsController");

router.get("/getls", isAuthenticated, getLs);
router.get("/getone", getOne);
router.post("/addls", isAuthenticated, addLs);

module.exports = router;