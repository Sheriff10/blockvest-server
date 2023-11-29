const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const error = require("./middleware/errors");

// Database Connection Config
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log("Connected to Database Successfully"))
   .catch((err) => console.log("Database Connection Error: " + err));

const app = express();
app.use(cors());
app.use(express.json());
require("./start/routeModule")(app);

app.use(error)

app.listen(5000 || process.env.PORT, () => {
   console.log("listening to port 5000");
});
