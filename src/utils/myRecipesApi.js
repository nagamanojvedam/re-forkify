import axios from "axios";

import { myApiUrl, apiKey } from "./config";

export const getRecipes = async (search) => {
  const {
    data: {
      data: { recipes },
      status,
    },
  } = await axios(`${myApiUrl}?search=${search}`, {
    method: "GET",
    params: {
      key: apiKey,
    },
  });

  if (status === "error") throw new Error("Cannot load the recipes");

  return recipes;
};

export const createRecipe = async (newRecipe) => {
  const {
    data: {
      data: { recipe },
      status,
    },
  } = await axios(`${myApiUrl}`, {
    method: "POST",
    data: newRecipe,
  });
  if (status === "error") throw new Error("Cannot load the recipes");

  return recipe;
};

export const getRecipe = async (id) => {
  console.log("id", id);
  const {
    data: {
      data: { recipe },
      status,
    },
  } = await axios(`${myApiUrl}/${id}`);

  if (status === "error") throw new Error("Cannot load the recipe");
  return recipe;
};

export const deleteRecipe = async (id) => {
  const response = await axios(`${myApiUrl}/${id}`, {
    method: "DELETE",
  });
  if (response.status === "error") throw new Error("Cannot load the recipes");

  return response;
};
