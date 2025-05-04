const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL).then((conn) => {
  console.log("Connected to MongoDB:", conn.connection.name);
});

app.listen(port, () => {
  console.log("Server running at port:", port);
});
