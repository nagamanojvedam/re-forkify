const Recipe = require("../models/recipeModel");

exports.getRecipes = async (req, res, next) => {
  const { search } = req.query;

  if (!search) {
    const recipes = await Recipe.find();

    if (!recipes)
      return res.status(400).json({
        status: "error",
        message: "Invalid request",
      });

    return res.status(200).json({
      status: "success",
      length: recipes.length,
      data: {
        recipes,
      },
    });
  }

  const recipes = await Recipe.find({
    title: { $regex: search, $options: "i" },
  });

  if (!recipes)
    return res.status(400).json({
      status: "error",
      message: "Error finding recipies",
    });

  return res.status(200).json({
    status: "success",
    length: recipes.length,
    data: {
      recipes,
    },
  });
};

exports.createRecipe = async (req, res, next) => {
  const newRecipe = new Recipe(req.body);

  if (!newRecipe)
    return res.status(400).json({
      status: "error",
      message: "Cannot create new recipe",
    });

  await newRecipe.save();

  return res.status(200).json({
    status: "success",
    recipe: newRecipe,
  });
};

exports.getRecipe = async (req, res, next) => {
  const { id: _id } = req.params;
  const recipe = await Recipe.findOne({ _id });

  if (!recipe)
    return res.status(404).json({
      status: "error",
      message: "No recipe found with the ID",
    });

  return res.status(200).json({
    status: "success",
    data: {
      recipe,
    },
  });
};

exports.deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipe.findOne({ _id: id });

  if (!recipe)
    return res.status(404).json({
      status: "error",
      message: "No recipe found with the ID",
    });

  await Recipe.findByIdAndDelete(id);

  return res.status(200).json({
    status: "success",
    message: "Recipe deleted successfully",
  });
};
