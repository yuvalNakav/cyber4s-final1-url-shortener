require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/public", express.static(`./public`));
app.use("/api", api);

module.exports = app;
