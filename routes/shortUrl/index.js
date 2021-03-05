const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const DataBase = require("../../models/dataBaseObj");
// let x = new DataBase(0, `https://facebook.com`);
// let y = new DataBase(0, `https://facebook.com`);
// console.log(x, y);
router.use(express.json());

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../../views") });
});
router.get("/new");

router.post("/new", (req, res) => {
  const { body } = req;
  const url = body.url;
  const urlObject = new DataBase(0, url);
  fs.writeFile(
    `bins/${urlObject.shortUrl}.json`,
    JSON.stringify(urlObject, null, 4),
    (err) => {
      if (err) {
        console.log("there was en error " + err);
      } else {
        console.log(
          urlObject.originalUrl + " was shortened to: " + urlObject.shortUrl
        );
      }
    }
  );
});
module.exports = router;
