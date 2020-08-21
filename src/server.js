const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("The server has started on port:", PORT));

// Set up mongoos
mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log("MongoDB connection established");
  }
);

// Set up routes

app.use("/users", require("./routers/user.routes"));
