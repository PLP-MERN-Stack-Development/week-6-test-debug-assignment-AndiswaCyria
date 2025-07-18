require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bugs', bugRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://andiswacyriam:Thisis2025@plp.bjw4seu.mongodb.net/?retryWrites=true&w=majority&appName=PLP';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
