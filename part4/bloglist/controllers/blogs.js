const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });

  response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body.likes ? request.body : {...request.body, likes: 0};

  const user = await User.findById(body.user);

  if (!body.title || !body.url) {
    return response.status(400).json({
      error : "content missing"
    });
  }

  const blog = new Blog({...body, user: user.id});

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  
  response.status(201).json(savedBlog);
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
