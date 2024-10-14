const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();



const app = express();
app.get("/",(req,res)=>{
    res.send("It is a todoapp Backend service - /todos to acess the todos json datas")
})
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({
    origin: "https://todo-backend-6l76.onrender.com",
}));
// Middleware
app.use(express.json());
app.use('/todos', todoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
