const experss = require("express");

const recipeController = require("../controllers/recipeController");

const router = experss.Router();

router
  .route("/")
  .get(recipeController.getRecipes)
  .post(recipeController.createRecipe);

router
  .route("/:id")
  .get(recipeController.getRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = router;
