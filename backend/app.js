const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./routes/UserRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

module.exports = app;
