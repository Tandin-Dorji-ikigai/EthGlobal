const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

const userRoutes = require("./routes/UserRoutes");
const photoRoutes = require("./routes/PhotoRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

app.get('/api/images/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, 'images', filename);
    res.sendFile(imagePath);
});

module.exports = app;