const mongoose = require('mongoose'); // Import mongoose to connect to the DB
const supertest = require('supertest'); // Import supertest to make test API call
const app = require('../app'); // Import our Express application to be tested
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const helper = require('../utils/users_helper');

const api = supertest(app); // Wraps the application with the supertest, making it a superagent object
// Now, tests can use this superagent object to make HTTP requests to the backend.

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
})

test('invalid user is not created and returns a suitable status code and error message', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'm',
    name: 'Forgot My Username',
    password: '414124',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
})

// The afterAll method (from jest) used to run code (close the db connection) after running all tests.
afterAll(async () => {
  await mongoose.connection.close();
});