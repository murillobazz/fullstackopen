const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const cors = require('cors');

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

const ErrorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(ErrorHandler);

module.exports = app;