const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user.js");
const reviewRouter = require("./routes/review.js");

//app config
const app = express();
const port = 8080;

//middlwares
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/review", reviewRouter);

//db config
const connection_url =
  "mongodb+srv://admin:abcd1234@cluster0.s7z79nn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => console.log("successfully connected to database"))
  .catch((err) => console.log(err));

//listener
app.listen(port);
