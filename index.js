
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5050;
const componentRoutes = require('./routes/componentRoutes');

const allowedOrigins = ["https://component-suggestion-tool.netlify.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());


app.use('/api', componentRoutes);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

