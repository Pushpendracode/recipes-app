const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🍽️ Recipes API is running!',
    endpoints: {
      getAllRecipes:  'GET    /api/recipes',
      createRecipe:  'POST   /api/recipes',
      getRecipeById: 'GET    /api/recipes/:id',
      updateRecipe:  'PUT    /api/recipes/:id',
      deleteRecipe:  'DELETE /api/recipes/:id',
    }
  });
});

app.use('/api/recipes', recipeRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});