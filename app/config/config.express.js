/*
 * Config.Express 
 * Jesús Juan Aguilar 02/2017
 * */
var bodyParser    = require('body-parser');
var helmet        = require('helmet');
var cookieParser  = require('cookie-parser');
var morgan        = require('morgan');
var PUBLIC_URL    = __dirname + '/../../public';
var session = require('express-session');
const config = require('./config.json');

exports.build = function (app, express) {

    app.use(express.static(PUBLIC_URL));
    app.use(morgan(config.environment));
    app.use(cookieParser());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ 
        extended: true
    }));


    app.use(session({
      secret: '23e23dsadswd23ddnjuiwd82dhqsgdya78dy832hu',
      resave: true,
      saveUninitialized: true,
    }));
    app.disable('x-powered-by');
    
    return app;
}