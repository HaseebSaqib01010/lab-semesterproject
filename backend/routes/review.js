const express = require("express");
const Review = require("../models/Review");
const User = require("../models/User");

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  let reviews;
  try {
    reviews = await Review.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!reviews) {
    return res.status(404).json({ message: "No reviews Found" });
  }
  return res.status(200).json({ reviews });
});
reviewRouter.get("/:id", async (req, res) => {
  const reviewId = req.params.id;
  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  return res.status(200).json({ review });
});
reviewRouter.post("/add", async (req, res, next) => {
  const { title, description, image, category, date, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "user not found" });
  }

  const newReview = new Review({
    title,
    description,
    image,
    category,
    date,
    user,
  });
  try {
    await newReview.save();
    existingUser.reviews.push(newReview);
    await existingUser.save();
  } catch (error) {
    console.log(error);
    x;
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newReview });
});
reviewRouter.put("/update/:id", async (req, res, next) => {
  const { title, description } = req.body;
  const reviewId = req.params.id;
  let review;

  try {
    review = await Review.findByIdAndUpdate(reviewId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(500).json({ message: "not updated" });
  }
  return res.status(200).json({ review });
});
reviewRouter.delete("/:id", async (req, res) => {
  const reviewId = req.params.id;
  let review;
  try {
    review = await Review.findByIdAndRemove(reviewId).populate("user");
    await review.user.reviews.pull(review);
    await review.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!review) {
    return res.status(500).json({ message: "not deleted" });
  }
  return res.status(200).json({ message: "Review Deleted" });
});

module.exports = reviewRouter;
