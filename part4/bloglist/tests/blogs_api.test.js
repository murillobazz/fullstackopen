const mongoose = require('mongoose'); // Import mongoose to connect to the DB
const supertest = require('supertest'); // Import supertest to make test API calls
const app = require('../app'); // Import our Express application to be tested
const Blog = require('../models/blog');

const api = supertest(app); // Wraps the application with the supertest, making it a superagent object
// Now, tests can use this superagent object to make HTTP requests to the backend.

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'First Author',
    url: 'firstURL',
    likes: 1
  },
  {
    title: 'Second Blog',
    author: 'Second Author',
    url: 'secondURL',
    likes: 2
  }
];
// Reinitialize the database with 'initialBlogs' before every test.
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
})

test('the blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

    console.log(response.body);
})

test('the id property exists', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  expect(blogs[0].id).toBeDefined();
  console.log(blogs);
})

test('succesfully creates a new blog', async () => {
  const requestBody = {
    title: 'apiTest',
    author: 'apiTestAuthor',
    url: 'apiTestURL',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(requestBody)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/blogs');

  expect(response.body.length).toEqual(initialBlogs.length + 1);
})

test('defaults likes property to 0 if it is missing from body', async () => {
  const reqBody = {
    title: 'apiTest',
    author: 'apiTestAuthor',
    url: 'apiTestURL',
  }

  await api
    .post('/api/blogs')
    .send(reqBody)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogs = response.body;

  expect(blogs[blogs.length - 1].likes).toBe(0);
})

describe('content missing:', () => {
  test('title', async () => {
    const reqBody = {
      author: 'apiTestAuthor',
      url: 'apiTestURL',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(reqBody)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  })

  test('url', async () => {
    const reqBody = {
      author: 'apiTestAuthor',
      title: 'apiTestTitle',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(reqBody)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  })
})

test('succesfully deletes a blog', async () => {
  const requestBody = {
    title: 'apiTest',
    author: 'apiTestAuthor',
    url: 'apiTestURL',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(requestBody)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  const id = blogs[blogs.length - 1].id
  
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})

test('succesfully updates a blog', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  const {id, likes} = blogs[0];
  const updatedLikes = { likes: likes + 1 }

  await api
    .put(`/api/blogs/${id}`)
    .send(updatedLikes)
    .expect(200)
})

// The afterAll method (from jest) used to run code (close the db connection) after running all tests.
afterAll(async () => {
  await mongoose.connection.close();
})