const app = require("express")();
const cors = require("cors");
const routes = require("./routes/prints");

app.use(cors());

app.get("/", (req, res) => res.send("This server is working"));

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
