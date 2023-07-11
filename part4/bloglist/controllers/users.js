const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next)  => {
    const { username, name, password } = request.body;

    if (!password) {
      return response.status(400).json({
        error : "password is required"
      });
    } else if (password.length < 3) {
      return response.status(400).json({
        error : "password must be at least 3 characters long"
      });
    } 

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    })

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch(e) {
    next(e);
  }
})

module.exports = usersRouter;