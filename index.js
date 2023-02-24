// Importing files

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL; // Database connection string
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// Connecting Database

mongoose.connect(mongoString);
const database = mongoose.connection;

// Checking if database is connected or not

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

// Creating server

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);
