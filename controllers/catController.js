// Importing model

const Category = require("../models/Category");

// Inserts category object in database

exports.create = async (req, res) => {
  // Creating new category object
  const newCat = new Category({
    name: req.body.name,
  });
  // Save category object in database
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reads all category data from database

exports.findAll = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update category object in database

exports.update = async (req, res) => {
  // Creates category object and updates it in database by using param id
  try {
    const id = req.params.id;
    const updatedcat = new Category({
      _id: req.params.id,
      name: req.body.name,
    });
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(id, updatedcat, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete category object in database

exports.destroy = async (req, res) => {
  // Find category object from database and delete it by using param id
  try {
    const id = req.params.id;
    const cat = await Category.findByIdAndDelete(id);
    res.send(`Document with ${cat.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
