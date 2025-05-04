const express = require("express");
const cors = require("cors");

const recipeRouter = require("./routes/recipieRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/recipes", recipeRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  });
});

module.exports = app;
