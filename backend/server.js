const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Successfully connected to MongoDB'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Basic API Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JCSAM API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
