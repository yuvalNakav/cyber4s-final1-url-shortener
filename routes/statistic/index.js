const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");

router.use(express.json());

router.get("/", async (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../../views") });
});
module.exports = router;
