const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
});
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Please Login instead" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    reviews: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ newUser });
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found please sign up" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(201)
    .json({ message: "Login Successful", user: existingUser });
});

module.exports = userRouter;
