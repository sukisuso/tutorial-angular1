var mongoose = require('mongoose');    

var Sala = new mongoose.Schema({
    name: { type: String },
    size: { type: Number},
});

mongoose.model('Sala', Sala);
