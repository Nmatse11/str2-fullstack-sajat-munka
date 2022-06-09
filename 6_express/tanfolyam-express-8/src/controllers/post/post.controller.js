const createError = require('http-errors');
const logger = require('../../config/logger');
const postService = require('./post.service');

exports.create = (req, res, next) => {
  const { title, body, author } = req.body;
  if (!title || !body || !author) {
    return next(new createError.BadRequest('No title, body or authorId!'));
  }

  const postData = {
    title,
    body,
    author
  };

  return postService.create(postData)
    .then(createPost => {
      res.status(201);
      res.json(createPost);
    })
    // élesben nem jó az err.message visszaküldése, mert sok fontos adat lehet benne
    // .catch(err => next(new createError.BadRequest(err.message)));
    .catch(err => next(new createError.BadRequest('Something wrong')));
};

exports.findOne = (req, res, next) => {
  return postService.findOne(req.params.id)
    .then(post => {
      if (!post) {
        return next(new createError.BadRequest('Post is not found!'));
      }
      res.json(post);
    })
    //.catch(err => next(new createError.BadRequest(err.message)));
    .catch(err => next(new createError.BadRequest('Something wrong')));
}
