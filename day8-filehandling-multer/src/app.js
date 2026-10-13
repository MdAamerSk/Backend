const express = require("express");
const file = require("./routes/file.route");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/file", file);

module.exports = app;