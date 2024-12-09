const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
app.use(
  cors({
    path: "*",
  })
);
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });
