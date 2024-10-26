const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["https://todoapp-olive-phi.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);
// Middleware
app.use(express.json());
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send(
    "It is a todoapp Backend service - /todos to acess the todos json datas"
  );
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

module.exports = app;
