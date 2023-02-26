// Importing files

const User = require("../models/User"); // User Model imported
const Post = require("../models/Post");
const bcrypt = require("bcrypt"); //bcrypt imported

// Updates User data in database

exports.update = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const id = req.params.id;
    // Creating new user
    const updatedUser = new User({
      _id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const options = { new: true };
    // Updating new user in database
    const result = await User.findByIdAndUpdate(id, updatedUser, options);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete user from database

exports.destroy = async (req, res) => {
  try {
    // find user from database using param id
    const user = await User.findById(req.params.id);
    console.log("user : \n" + user);
    try {
      // Delete all the post which are created by this user
      const deletedPosts = await Post.deleteMany({ username: user.username });
      console.log(deletedPosts);
      // Delete user data
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      console.log(deletedUser);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(404).json("User not found!");
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

// Read all the user from database

exports.findAll = async (req, res) => {
  // Declaring user parameters from query
  const username = req.query.username;
  const email = req.query.email;
  try {
    let users;
    if (username) {
      //search users by username
      users = await User.find({
        $or: [{ username: { $regex: username } }],
      }).sort({ createdAt: -1 });
    } else if (email) {
      //search users by email
      users = await User.find({
        $or: [{ email: { $regex: email } }],
      }).sort({
        createdAt: -1,
      });
    } else {
      //reads all the users from database
      users = await User.find().sort({ createdAt: -1 });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
