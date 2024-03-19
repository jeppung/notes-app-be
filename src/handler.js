const {nanoid} = require('nanoid');
const notes = require('./notes');

const postHandler = (req, h) => {
  const {title, tags, body} = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getHandler = (req, h) => {
  return h.response({
    status: 'success',
    data: {
      notes,
    },
  }).code(200);
};

const getByIdHandler = (req, h) => {
  const {id} = req.params;

  const data = notes.find((n) => n.id == id);


  if (data) {
    return h.response(data).code(200);
  }

  return h.response({
    message: 'Not Found',
  }).code(404);
};

const editHandler = (req, h) => {
  const {id} = req.params;
  const {title, tags, body} = req.payload;

  const index = notes.findIndex((n) => n.id == id);

  if (index >= 0) {
    notes[index].title = title;
    notes[index].tags = tags;
    notes[index].body = body;
    notes[index].updatedAt = new Date().toISOString();

    return h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
  }).code(404);
};

const deleteHandler = (req, h) => {
  const {id} = req.params;

  const index = notes.findIndex((n) => n.id == id);

  if (index >= 0) {
    notes.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  }).code(404);
};


module.exports = {
  postHandler,
  getHandler,
  getByIdHandler,
  editHandler,
  deleteHandler,
};

