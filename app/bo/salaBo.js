/**
 * Jesús Juan Aguilar 2017
 * Sala BO
 */
const co = require('co');
const handler = require('../helpers/error-express');
const salaBll = require('../bll/salaBll');

function StartPaths(app){

    app.post('/api/sala', createNewSala);
    app.get('/api/sala', getAllSala);
    app.delete('/api/sala', removeSala);
    app.put('/api/sala', updateSala);
}

function createNewSala (req, res) {
  co(function *() {
      var newContent = yield salaBll.save(req.body.sala);
      res.send(newContent);
  }).catch(err =>{handler(res)});
}

function getAllSala (req, res) {
  co(function *() {
      var salas = yield salaBll.find();
      res.send(salas);
  }).catch(err =>{handler(res)});
}

function removeSala (req, res) {
  co(function *() {
      var salas = yield salaBll.remove(req.body.id);
      res.send(salas);
  }).catch(err =>{handler(res)});
}

function updateSala (req, res) {
  co(function *() {
      var salas = yield salaBll.update(req.body.id, req.body.sala);
      res.send(salas);
  }).catch(err =>{handler(res)});
}

exports.startPaths = StartPaths;