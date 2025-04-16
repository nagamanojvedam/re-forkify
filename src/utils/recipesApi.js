import axios from "axios";

import { apiUrl, apiKey } from "./config";

export const getRecipes = async (search) => {
  const {
    data: {
      data: { recipes },
      status,
    },
  } = await axios(`${apiUrl}?search=${search}`, {
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
  } = await axios(`${apiUrl}`, {
    method: "POST",
    data: newRecipe,
    params: {
      key: apiKey,
    },
  });
  if (status === "error") throw new Error("Cannot load the recipes");

  return recipe;
};

export const getRecipe = async (id) => {
  const {
    data: {
      data: { recipe },
      status,
    },
  } = await axios(`${apiUrl}/${id}`, {
    params: {
      key: apiKey,
    },
  });
  if (status === "error") throw new Error("Cannot load the recipes");

  return recipe;
};

export const deleteRecipe = async (id) => {
  const response = await axios(`${apiUrl}/${id}`, {
    method: "DELETE",
    params: {
      key: apiKey,
    },
  });
  if (response.status === "error") throw new Error("Cannot load the recipes");

  return response;
};
