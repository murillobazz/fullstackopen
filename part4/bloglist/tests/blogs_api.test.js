const mongoose = require('mongoose'); // Import mongoose to connect to the DB
const supertest = require('supertest'); // Import supertest to make test API calls
const app = require('../app'); // Import our Express application to be tested

const api = supertest(app); // Wraps the application with the supertest, making it a superagent object
// Now, tests can use this superagent object to make HTTP requests to the backend.

test('the blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
    
    console.log(response.body);
})
// The afterAll method (from jest) used to run code (close the db connection) after running all tests.
afterAll(async () => {
  await mongoose.connection.close();
})