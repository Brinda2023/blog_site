// Importing model

const Category = require("../models/Category");
const Post = require("../models/Post");

// Creating new post and insert it into database

exports.create = async (req, res) => {
  // Creating new post object
  const newPost = new Post({
    name: req.body.name,
    content: req.body.content,
    username: req.body.username,
    category: req.body.category,
  });
  // Save new post object into database
  try {
    console.log(newPost);
    const savedPost = await newPost.save();
    console.log(savedPost);

    // const category = await Category.find({ name: savedPost.category });
    // console.log(category);
    // category.post.push(newPost);
    // console.log(category);
    // await category.save();
    
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update post object in database

exports.update = async (req, res) => {
  try {
    // Find post in database by using param id
    const post = await Post.findById(req.params.id);
    // Only user can update the post who created the post
    if (post.username === req.body.username) {
      try {
        const id = req.params.id;
        // Creating new post
        const updatedPost = new Post({
          _id: id,
          name: req.body.name,
          content: req.body.content,
          username: req.body.username,
          category: req.body.category,
        });
        const options = { new: true };
        // Updating new post in database
        const result = await Post.findByIdAndUpdate(id, updatedPost, options);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete post object from database

exports.destroy = async (req, res) => {
  try {
    // Find post using param id
    const post = await Post.findById(req.params.id);
    // Only user can delete the post who created the post
    console.log("req.params.id : " + req.params.id);
    console.log("post.username : " + post.username);
    console.log("req.body.username : " + req.body.username);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Read the post data from database which has param id

exports.findOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Read all the post from database

exports.findAll = async (req, res) => {
  // Declaring post parameters from query
  const username = req.query.user;
  const catName = req.query.cat;
  const name = req.query.name;
  const content = req.query.content;
  try {
    let posts;
    if (username) {
      //search posts by username
      posts = await Post.find({
        $or: [{ username: { $regex: username } }],
      }).sort({ createdAt: -1 });
    } else if (name) {
      //search posts by post name
      posts = await Post.find({
        $or: [{ name: { $regex: name } }],
      }).sort({
        createdAt: -1,
      });
    } else if (content) {
      //search posts by content
      posts = await Post.find({
        $or: [{ content: { $regex: content } }],
      }).sort({
        createdAt: -1,
      });
    } else if (catName) {
      //search posts by category
      posts = await Post.find({
        category: {
          $or: [{ content: { $regex: category } }],
        },
      }).sort({ createdAt: -1 });
    } else {
      //reads all the posts from database
      posts = await Post.find().sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
