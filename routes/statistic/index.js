const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");

router.use(express.json());

router.get("/", async (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../../views") });
});
// router.get("/: url")

router.post("/", (req, res) => {
  const { body } = req;
  console.log(body);
  fs.writeFile(`shorturl/.json`, JSON.stringify(body, null, 4), (err) => {
    if (err) throw err;
    console.log(err + "ima shch ali");
  });
  // res.send("imashcha zona rezach");
});
module.exports = router;
