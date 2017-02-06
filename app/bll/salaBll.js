/**
*  Jesús Juan Aguilar - SalaBll 
*	 02/2017
*/

const datapool = require('./../datapool');
const salaModel = datapool.getRepository('Sala');

exports.save = save;
exports.find = find;
exports.remove = remove;
exports.update = update;

function save (dto) {
	var sv = new salaModel(dto);
	return sv.save();
}

function find () {
	  return salaModel.find({}).lean().exec();
}

function remove (id){
	return salaModel.findOneAndRemove({ _id: datapool.id(id) });
}

function update (id, body){
    return salaModel.findOneAndUpdate({ _id: datapool.id(id) }, body);
}