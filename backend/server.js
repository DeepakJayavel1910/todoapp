const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

//username : jayaveldeepak19
//pssword : FGnvFzw9uXPS3pxW

//url:

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
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
