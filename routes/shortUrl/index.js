const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const DataBase = require("../../models/dataBaseObj");
router.use(express.json());
const fetch = require("node-fetch");
require("dotenv").config();
const binRoot =
  process.env.NODE_ENV === "test" ? "./bins/test.json" : "./bins/bin.json";

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(binRoot, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      const binArr = JSON.parse(success);
      if (binArr[id - 1] === undefined) {
        fs.writeFile(
          `bins/bin.json`,
          JSON.stringify(binArr, null, 4),
          (err) => {
            if (err) {
              console.log("there was en error " + err);
            } else {
              console.log("page redirected successfully!");
              res.send({ error: "No short URL found for the given input" });
            }
          }
        );
      } else if (binArr[id - 1].shortUrl === id) {
        binArr[id - 1].redirectCount++;
        fs.writeFile(
          `bins/bin.json`,
          JSON.stringify(binArr, null, 4),
          (err) => {
            if (err) {
              console.log("there was en error " + err);
            } else {
              console.log("page redirected successfully!");
            }
          }
        );
        res.redirect(binArr[id - 1].originalUrl);
      }
    }
  });
});

router.post("/new", checkInBin, checkInWeb, (req, res) => {
  const { body } = req;
  const url = body.url;
  fs.readFile(binRoot, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      const binArr = JSON.parse(success);
      const urlObject = new DataBase(url, binArr.length + 1);
      binArr.push(urlObject);
      fs.writeFile(binRoot, JSON.stringify(binArr, null, 4), (err) => {
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
function checkInBin(req, res, next) {
  const { body } = req;
  const url = body.url;
  fs.readFile(binRoot, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      const binArr = JSON.parse(success);
      for (let bin of binArr) {
        if (bin.originalUrl === url) {
          res.send({
            original_url: bin.originalUrl,
            short_url: bin.shortUrl,
          });
          fs.writeFileSync(binRoot, binArr);
          console.log(binArr);
        }
      }
    }
  });
  next();
}
function checkInWeb(req, res, next) {
  const { body } = req;
  const url = body.url;
  let nodeFetch = fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        res.send({ error: "Invalid Hostname" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("this url does not exist");
      res.send({ error: "Invalid Hostname" });
    });
}
module.exports = router;
