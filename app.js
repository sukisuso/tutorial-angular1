/*
 * index 
 * Jesús Juan Aguilar 2017
 * 
 * */
var express    = require('express');
var expressCfg = require('./app/config/config.express.js'); 
var router     = require('./app/router'); 
var app        = express();
var config     = require('./app/config/config.json');

expressCfg.build(app, express);
router.redirect(app);

app.listen(config.port);
console.log('Listening on 3000');