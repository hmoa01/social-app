const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB is connected!"))
  .catch((error) => console.log(error));

server.use(express.json());

server.use("/api", require("./routes"));

server.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
