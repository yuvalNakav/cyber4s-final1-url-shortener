const { Router } = require("express");
const statistic = require("./statistic");
const api = Router();

api.use("/statistic", statistic);

module.exports = api;
