const express = require("express");
const router = express.Router();
const printsController = require("../controllers/printsController");

router.get("/prints", printsController);

module.exports = router;
