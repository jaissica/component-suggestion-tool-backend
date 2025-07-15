
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5050;
console.log('Loading MONGODB_URI from .env:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const componentRoutes = require('./routes/componentRoutes');


app.use(cors());
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

