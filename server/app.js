// Main server setup
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/banking-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});