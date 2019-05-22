const express = require("express");

// DB Configuration
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("err"));

// Routing
const app = express();
app.get("/", (req, res) => res.send("HELL!"));

// Users Route
const users = require("./routes/api/users");
app.use("/api/users", users);

// Port Connection
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
