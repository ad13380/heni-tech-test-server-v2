const app = require("express")();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => res.send("This server is working"));

module.exports = app;