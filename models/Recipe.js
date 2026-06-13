const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
      trim: true,
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be at least 1 minute'],
    },
    servings: {
      type: Number,
      required: [true, 'Servings is required'],
      min: [1, 'Servings must be at least 1'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);