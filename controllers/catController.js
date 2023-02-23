const Category = require("../models/Category");

exports.create = async (req, res) => {
  const newCat = new Category({
    name: req.body.name,
    posts: req.body.posts
  });
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedcat = req.body;
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(id, updatedcat, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Category.findByIdAndDelete(id);
    res.send(`Document with ${cat.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
