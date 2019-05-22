const express = require("express");

// DB Configuration
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("err"));

const app = express();
app.get("/", (req, res) => res.send("HELL!"));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
