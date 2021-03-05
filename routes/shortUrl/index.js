const { Console } = require("console");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const DataBase = require("../../models/dataBaseObj");
router.use(express.json());

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../../views") });
});
router.get("/new", (req, res) => {});

router.post("/new", checkExistence, (req, res) => {
  const { body } = req;
  const url = body.url;
  fs.readFile(`bins/bin.json`, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      let binArr = JSON.parse(success);
      const urlObject = new DataBase(url, binArr.length + 1);
      binArr.push(urlObject);
      fs.writeFile(`bins/bin.json`, JSON.stringify(binArr, null, 4), (err) => {
        if (err) {
          console.log("there was en error " + err);
        } else {
          console.log(
            urlObject.originalUrl + " was shortened to: " + urlObject.shortUrl
          );
        }
      });
      res.send({
        original_url: urlObject.originalUrl,
        short_url: urlObject.shortUrl,
      });
    }
  });
});
function checkExistence(req, res, next) {
  const { body } = req;
  const url = body.url;
  fs.readFile(`bins/bin.json`, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      let binArr = JSON.parse(success);
      for (let bin of binArr) {
        if (bin.originalUrl === url) {
          res.send({
            original_url: bin.originalUrl,
            short_url: bin.shortUrl,
          });
        } else {
          next();
        }
      }
    }
  });
}
module.exports = router;
