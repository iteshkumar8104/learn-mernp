const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edulearn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const uploadRoutes = require('./routes/upload');

// Routes
app.get('/', (req, res) => {
  res.send('EduLearn Backend API');
});

app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/upload', uploadRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
