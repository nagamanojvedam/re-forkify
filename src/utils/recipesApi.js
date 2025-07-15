import axios from "axios";

const { VITE_API_URL: apiUrl, VITE_API_KEY: apiKey } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  params: {
    key: apiKey,
  },
});

export const getRecipes = async (search) => {
  try {
    const {
      data: {
        data: { recipes },
        status,
      },
    } = await axiosInstance.get(`/`, {
      params: {
        ...axiosInstance.defaults.params,
        search,
      },
    });

    if (status === "error") throw new Error("Failed to fetch recipes");

    return recipes;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch recipes");
  }
};

export const createRecipe = async (newRecipe) => {
  try {
    const {
      data: {
        data: { recipe },
        status,
      },
    } = await axiosInstance.post(`/`, newRecipe);
    if (status === "error") throw new Error("Failed to create recipe");

    return recipe;
  } catch (err) {
    throw new Error(err.message || "Failed to create recipe");
  }
};

export const getRecipe = async (id) => {
  try {
    const {
      data: {
        data: { recipe },
        status,
      },
    } = await axiosInstance.get(`/${id}`);
    if (status === "error") throw new Error("failed to fetch recipe");

    return recipe;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch recipe");
  }
};

export const deleteRecipe = async (id) => {
  try {
    const {
      data: { status },
    } = await axiosInstance.delete(`/${id}`);
    if (status === "error") throw new Error("Failed to delete recipe");

    return status;
  } catch (err) {
    throw new Error(err.message || "Failed to delete recipe");
  }
};
