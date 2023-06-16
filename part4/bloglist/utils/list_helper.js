const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0
  ? 0
  : blogs.reduce((acc, current) => acc + current.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  let current = {};

  blogs.forEach((element, index, array) => {
    if (index === 0) {
      current = { title: element.title, author: element.author, likes: element.likes }
    };

    if (element.likes > current.likes) {
      current = { title: element.title, author: element.author, likes: element.likes }
    }
  })

  return current;
}

const mostBlogs = (blogs) => {
  const blogCount = Object.entries(_.countBy(blogs, 'author'));

  blogCount.forEach((element, index, array) => {
    if (index === 0) {
      current = blogCount[0];
    };

    if (element[1] > current[1]) {
      current = element
    }
  })

  const mostBlogs = {
    author: current[0],
    blogs: current[1]
  };

  return mostBlogs;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}