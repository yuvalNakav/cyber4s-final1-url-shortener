const { Router } = require("express");
const statistic = require("./statistic");
const shortUrl = require("./shortUrl");
const api = Router();
api.use("/shorturl", shortUrl);
api.use("/statistic", statistic);

module.exports = api;
