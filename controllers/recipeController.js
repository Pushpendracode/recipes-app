const Recipe = require('../models/Recipe');

// @desc    Create a new recipe
// @route   POST /api/recipes
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update recipe by ID
// @route   PUT /api/recipes/:id
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete recipe by ID
// @route   DELETE /api/recipes/:id
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };