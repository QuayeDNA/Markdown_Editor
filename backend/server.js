// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');
const documentRoutes = require('./routes/documents');

const app = express();

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3001;

mongoose.connect(dbURI, {

 })
  .then((result) => {
    console.log('Connected to the database');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/documents', documentRoutes);