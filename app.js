require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes");
// const router = require("./statistic/router");
const DataBase = require(`./models/dataBaseObj.js`);
// let x = new DataBase(0, `https://facebook.com`);
// let y = new DataBase(0, `https://facebook.com`);
// console.log(x, y);
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(`./public`));
app.use("/api", api);

module.exports = app;
