const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://todoapp-backend-wdul.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ["POST", "GET"],
  credentials: true,
}));


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
