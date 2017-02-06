const mongoose = require('mongoose');
const config = require('./config/config.json');
mongoose.connect(config.database);
const ObjectId = mongoose.Types.ObjectId;
const URL = '/models';
const URL_REQ = './models/'
const URL_BO = '/bo';
const URL_BO_REQ = './bo/'
const fs = require('fs');

exports.getRepository = function (model) {
	return mongoose.model(model);
};

exports.loadRepositories  = function () {
	var files = fs.readdirSync(__dirname+ URL);
	files.forEach(file => {
	  console.log('## DTO -- ' + URL_REQ + file.split('.')[0]);
	  require(URL_REQ + file.split('.')[0]);
	});
};

exports.id = function (id){
	return ObjectId(id);
};

exports.loadBussinesOperations = function (app) {
	var files = fs.readdirSync(__dirname+ URL_BO);
	files.forEach(file => {
	  console.log('## BO -- ' + URL_BO_REQ + file.split('.')[0]);
	  var bo = require(URL_BO_REQ + file.split('.')[0]);
      bo.startPaths(app);
	});
};