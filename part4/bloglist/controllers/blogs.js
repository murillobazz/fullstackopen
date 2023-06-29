const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body.likes ? request.body : {...request.body, likes: 0};

  if (!body.title || !body.url) {
    return response.status(400).json({
      error : "content missing"
    });
  }

  const blog = new Blog(body);

  const result = await blog.save();
  
  response.status(201).json(result);
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (e) {
    console.log(e);
    response.status(400).end();
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id, 
      { likes }, 
      { new: true, runValidators: true, context: 'query' }
    )

    response.json(result);
  } catch (e) {
    console.log(e);
    response.status(400);
  }
})

module.exports = blogsRouter;
