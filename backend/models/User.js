const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
