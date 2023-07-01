const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const server = express();

server.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB is connected!"))
  .catch((error) => console.log(error));
server.use(express.json({ limit: "10mb" }));
server.get("/", (req, res) => {
  res.send("Welcome to Social app!");
});

server.use("/api", require("./routes"));

server.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
