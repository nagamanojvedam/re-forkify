const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },

  image_url: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      _id: false,
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ], // should be array of objects or ingredients
  source_url: {
    type: String,
    required: true,
  },
  servings: { type: Number, required: true },
  cooking_time: { type: Number, required: true },
});

recipeSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v; // optional: also delete __v
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
