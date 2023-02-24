// Importing files

const User = require("../models/User"); // User Model imported
const bcrypt = require("bcrypt"); //bcrypt imported

// Updates User data in database

exports.update = async (req, res) => {
  // Check if user updates his own account
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const id = req.params.id;
      // Creating new user
      const updatedUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const options = { new: true };
      // Updating new user in database
      const result = await Post.findByIdAndUpdate(id, updatedUser, options);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
};

// Delete user from database

exports.destroy = async (req, res) => {
  // Check if user deletes his own account
  if (req.body.userId === req.params.id) {
    try {
      // find user from database using param id
      const user = await User.findById(req.params.id);
      try {
        // Delete all the post which are created by this user
        await Post.deleteMany({ username: user.username });
        // Delete user data
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
};

// Find user from database by its id

exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
