const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const recipeRouter = require("./routes/recipieRoutes");
const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use("/api/v1/recipes", recipeRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    return res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

module.exports = app;
