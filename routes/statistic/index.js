const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");

router.use(express.json());

router.get("/:id", (req, res) => {
  const id = req.params.id;
  // console.log(typeof id);
  fs.readFile(`bins/bin.json`, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      const binArr = JSON.parse(success);
      if (binArr[id - 1] === undefined) {
        res.send({ error: "No short URL found for the given input" });
      } else {
        res.send(binArr[id - 1]);
      }
    }
  });
});
module.exports = router;
