const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/prints");

app.use(cors());

app.get("/", (req, res) => res.send("This server is working"));

module.exports = app;
