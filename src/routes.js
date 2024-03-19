const {postHandler, getHandler, getByIdHandler,
  editHandler,
  deleteHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: postHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteHandler,
  },
];

module.exports = routes;
