# tutorial-angular1

## Primeros pasos:
```
$ git clone https://github.com/sukisuso/tutorial-angular1.git
$ cd tutorial-angular1
$ git checkout -b RAMA-JESUS  //Creamos una nueva rama en la que trabajar
```

## Instalar node y bower:
```
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ npm install -g bower
```

## Iniciar el proyecto:
```
$ mkdir public
$ mkdir app
$ touch app.js
$ touch .bowerrc
$ npm init
$ bower init (En caso de que no te vaya: 'sudo bower init --allow-root')
```

## Primer Servido en node:
*Añadimos las dependencias de node necesarias. El --save es para que se actulice el ficehro package.json*
```
$ npm install --save connect serve-static 
```

###### app.js:
*El require carga el modulo de node.* 
*Con serveStatic indicamos el directio que se va a servir cuando lleguen peticiones al puerto 3000, en este caso 'public' *
```
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/public')).listen(3000, function(){
    console.log('Server running on 3000...');
});
```

###### /public/index.html:
```
$ touch public/index.html
```
```
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Tutorial Angular</title>
</head>
<body>
    <h2>Hello world, from Node.js</h2>
</body>
</html>
```

*Ya tenemos montado nuestro primer servidor con node, solo falta arrancar el servidor, se puede hacer de dos formas:* 
```
$ node app
```
*O añadiendo en el package.json en la propiedad de scripts el mismo comando para ejecutarlo desde npm:* 
``` 
"scripts": {
   "deploy": "node app",
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 ```
*Y...*
```
$ npm run deploy
``` 
*Ya solo falta navegar hasta localhost:3000 :)*


## Añadiendo Angular al proyecto:
###### .bowerrc:
*Donde queremos que intsale los paquetes de bower*
```
{
	 "directory": "public/bower/"
}
```
*Instalamos angular y bootstrap*
```
$ bower install angular --save  || sudo bower install angular --allow-root --save
$ bower install bootstrap --save || sudo bower install bootstrap --allow-root --save
```

*Importamos en la vista ambas librerias desde index.html*
###### /public/index.html:
```
<link rel="stylesheet" href="bower/bootstrap/dist/css/bootstrap.min.css">
<script src="bower/angular/angular.min.js"></script>
```

## Primeros pasos con angular:
*Creamos la estructura de ficheros para angular:*
```
$ mkdir public/js
$ touch public/js/app.js
$ mkdir public/js/controllers
$ touch public/js/controllers/mainController.js
```

*Vamos a crear nuestro primer bind de angular*
*Primero creamos el modulo inicial del proyecto*
###### public/js/app.js:
```
var app = angular.module('app', []);
```

*A continuación creamos nuestro primer controlador*
###### public/js/controllers/mainController.js:
```
app.controller("appController", function appController($scope){
    $scope.helloWorld = "Hello world from Node.js and Angular-1";
});
```

*Por ultimo cambiamos nuestro index.html para que muestre el mensaje desde el $scope del controlador*
###### /public/index.html:
```
<body ng-app="app">
    <div  ng-controller="appController">
    {{ helloWorld }}
    </div>


    <script src="/js/app.js"></script>
    <script src="/js/controllers/mainController.js"></script>
</body>
```

*Si vamos a localhost:3000 tenemos nuestra primera web en angular*

*Directivas de angular:*
* ngApp
* ng-blur
* ng-change
* ng-class
* ng-click
* ng-controller
* ng-hide
* ng-if
* ng-init
* ng-model
* ng-show

*Ejemplo para el index.html:*
```
<div  ng-controller="appController" ng-init="init()">
        <style>
            .coloreur {
                background: red;
            }
        </style>
        <br/>

        <button type="button" ng-click="showText = !showText;">Click Me!</button>
        <p ng-show="showText">Hidden Text<p/>
        <p ng-if="showText">Hidden Text<p/>
        <p ng-hide="showText">Showing Text<p/>
        <p ng-class="{'coloreur': showText}"> Me just change background<p/>

        <br/>
        <form name="testForm">
            <input ng-model="val" type="text" />
            <input ng-model="val" type="text" />
            <input ng-model="val" type="text" />
        </form>
    </div>
```

*Solo hay que añadir esto en el controller*
```
    $scope.showText = null;
    $scope.init = function () {
        $scope.showText = false;
    };
```


## Fichero angular de producción:
*Para crear el fichero de produccion de angular vamos a usar grunt. Lo primero incluimos las dependencias:*
```
$ npm install --save-dev grunt
$ npm install --save-dev grunt-contrib-concat
```

*Lo que hara grunt será concatenar todos los ficheros sueltos de angular para que no tengamos que ir incluyendolos uno a uno*
*Creamos un fichero en el directorio raiz del proyecto que se llame Gruntfile.js*
´´´
$ touch Gruntfile.js
´´´

*Con el siguiente contenido:*
```
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "build": {
                "src": ["public/js/app.js", "public/js/controllers/*"],
                "dest": "public/js/build.js"
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};
```

*Por último añadimos un script en nuestro package.json que ejecute el grunt y despues arranque el servidor:*
```
"deploy-pro": "grunt && node app",
```
*Si ejecutamos el siguiente comando podremos ver el fichero build.js que seberiamos uncluir en el index.html en producción*
```
$ npm run deploy-pro
```

## Nuestra primera aplicación con angular Reserva de Salas:
*Lo primero que vamos a hacer es añadir ng-router. Que sirve para construir aplicaciones single page. Lo añadimos a index.html*
```
$ bower install angular-route --save || sudo bower install angular-route --save --allow-root 
<script src="bower/angular-route/angular-route.min.js"></script>
```

*A continuacion creamos nuestras primeras 'rutas' en el app.js de angular*
```
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $compileProvider){
 	$compileProvider.debugInfoEnabled(true);

	$routeProvider.when("/", {
		 templateUrl : "templates/main.html",
		 controller : "appController"
	})
	
	.when("/salas", {
		 templateUrl : "templates/salas/salas.html",
		 controller : "salasController"
	})

 	.otherwise({ redirectTo : "/"})
});
```
*Definimos una ruta por defecto que se cargara al arrancar la aplicación y una ruta donde alojaremos nuestro crud de salas*
*Cada ruta tiene un template html diferente vamos a crearlos:*
```
$ mkdir public/templates
$ mkdir public/templates/salas
$ mkdir public/js/controllers/salas
$ touch public/templates/main.html
$ touch public/templates/salas/salas.html
$ touch public/js/controllers/salas/salasController.js 
```

*Vamos a poner el siguiente contenido en cada uno de los tres ficheros que hemos creado*


###### /public/templates/main.html:
```
<h2> Welcome </h2>
```

###### /public/templates/salas/salas.html:
```
<h2> Salas World</h2>
```
###### /public/js/controllers/salas/salasController.js:
```
app.controller("salasController", function appController($scope){
});
```

*Por ultimo cambiamos el contenido de nuestro index.html al siguiente:*
```
<body ng-app="app">
    <div  ng-controller="appController" ng-init="init()">
       	<header id="header">
			<nav class="navbar navbar-light bg-faded">
			  <a class="navbar-brand" ng-href="#!/">Salas - Angular Tutorial.</a>
			  <ul class="nav navbar-nav">
			    <li class="nav-item">
			      <a class="nav-link" ng-href="#!/" target="_self">Inicio <span class="sr-only"></span></a>
			    </li>
			    <li class="nav-item">
			      <a class="nav-link" href="#!/salas" target="_self">Salas</a>
			    </li>
			    </ul>
			</nav>
		</header>

	
		<div ng-view></div>
    </div>
    
    <script src="/js/app.js"></script>
    <script src="/js/controllers/mainController.js"></script>
    <script src="/js/controllers/salas/salasController.js"></script>
</body>
``` 

*Ves a localhost:3000 y podras ver como ya puedes navegar entre las dos rutas!*

## Ahora ya si podemos crear nuestra Reserva de salas:

*Cambiamos el contenido de salas.html por el siguiente. Donde podremos encontrar una parte superior donde permitiremos añadir salas y filtrarlas*
*Y un formulario para añadir nuevas salas y permitir editarlas*
```
<div class="container">
    <h1 class="text-center">Salas CRUD</h1>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
        <div class="alert alert-default navbar-brand search-box">
          <button class="btn btn-primary" >Nueva sala <span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
        </div>
        <div class="alert alert-default input-group search-box">
          <span class="input-group-btn">
            <input type="text" class="form-control" placeholder="Search sala..." ng-model="search_query">
          </span>
        </div>
      </div>
    </nav>


    <div class="row">
        <div class="col-md-6 col-md-offset-3" style="margin-bottom:20px;">
            <form action="r" method="post" accept-charset="utf-8" class="form" role="form">
                <h4>Datos de la sala.</h4>
                <input style="border-radius:2px;" type="text" class="form-control input-lg" placeholder="Nombre"  />
                <input style="border-radius:2px;" type="number" class="form-control input-lg" placeholder="Capacidad"  />
                <button style="border-radius:2px; margin-top:3px" class="btn btn-lg btn-primary btn-block signup-btn" type="button">Crear</button>
            </form>          
          </div>
    </div>  
</div>
```

*El siguiente paso es ocultar el formulario y solo mostrarlo en caso de que se pulse el boton nueva sala.*
```
<button class="btn btn-primary" ng-click="showForm=!showForm">Nueva sala ...

<div class="row" ng-show="showForm">
```

*A continuacion vamos a añadir salas para ello creamos una tabla donde se mostraran las salas*
```
<div class="row" ng-show="salaItems.length > 0">
      <table class="table table-hover">
        <tr>
          <th>Nombre Sala</th>
          <th>Capacidad</th>
          <th></th>
          <th></th>
        </tr>
        <tr ng-repeat="sala in salaItems">
          <td>
            <td>{{sala.name}}</td>
            <td>{{sala.cap}}</td>
            <td>
              <button class="btn btn-warning" title="Edit"><span class="glyphicon glyphicon-edit"></span></button>
            </td>
            <td>
              <button class="btn btn-danger" title="Delete"><span class="glyphicon glyphicon-trash"></span></button>
            </td>
          </tr>
        </table>
    </div>
```

*Lo siguiente es poner el ngModel en los inputs del form y en ngClick al boton para añadir la sala al array que nos definiremos.*
```
<input ng-model="salaName" 
<input ng-model="salaCap" 
<button ng-click="addSalaToItems()"
```

*Y actualizamos el controlador de salas con la logica.*
```
app.controller("salasController", function appController($scope){

  $scope.showForm = false;
  $scope.salaName = null; 
  $scope.salaCap= null;
  $scope.salaItems = []; 

  $scope.addSalaToItems = function () {
    if ( !$scope.salaName || !$scope.salaCap ) {
      return;
    }

    $scope.salaItems.push({
      name: $scope.salaName,
      cap: $scope.salaCap,
    });

    $scope.salaName = null; 
    $scope.salaCap= null;
    $scope.showForm = false;
  }
});
```

## Eliminar y editar Salas:

*Eliminar salas es very easy:*
*El controllador:*
```
$scope.deleteSala = function (index) {
    $scope.salaItems.splice(index, 1);
}
```
*Y en el boton de la basura:*
```
ng-click="deleteSala($index)" 
```

*Para editar sala lo que vamos a hacer es pasarle al controlador la sala ponerla en el form y eliminarla del array:*
###### salas.html:
```
ng-click="editSala(sala, $index)"
```
###### salasController.js:
```
 if ($scope.editSalaIndex === undefined || $scope.editSalaIndex === null) {
      $scope.salaItems.push({
        name: $scope.salaName,
        cap: $scope.salaCap,
      });
    } else {
      $scope.salaItems.splice($scope.editSalaIndex, 0, {
        name: $scope.salaName,
        cap: $scope.salaCap,
      });
      $scope.editSalaIndex = undefined;
    }

...

 $scope.editSala = function (sala, index) {
    $scope.salaName = sala.name; 
    $scope.salaCap= sala.cap;
    $scope.salaItems.splice(index, 1);
    $scope.showForm = true;
    $scope.editSalaIndex = index;
  }
```

*Para acabar el crud con angular un toque de color:*
*Ponemos un mensaje de error justo encima del boton del formulario*
```
<p ng-show="errorForm" style="color:red;">Rellene todos los datos</p>
```

*Y su logica en el controlador:*
```
 $scope.errorForm = false;

 ...
if ( !$scope.salaName || !$scope.salaCap ) {
   $scope.errorForm = true;
   return;
}
...

$scope.showForm = false;
    $scope.errorForm = false;
```

## Server side, Express y MongoDb, persistencia de los datos:
*Instalar Mongo:*
```
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
```
*Herramienta para visualizar mongo:*
```
https://robomongo.org/download
```

*Una vez tenemos Mongodb intalado vamos a crear el arbol de directorios para el servidor de node:*
```
$ mkdir app/config
$ mkdir app/bll
$ mkdir app/bo
$ mkdir app/models
$ mkdir app/helpers
$ touch app/config/config.express.js
$ touch app/config/config.json
$ touch app/router.js
$ touch app/datapool.js 
```

*Instalamos las dependencias necesarias:*
```
$ npm install --save express body-parser co cookie-parser express-session helmet mongoose morgan
``` 

###### config.json:
*configuración general del proyecto*
```
{
    "author": "Jesús Juan Aguilar",
    "database": "mongodb://localhost:27017/tutorialangular",
    "port": 3000
}
```

###### config.express.js:
```
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
```

###### datapool.js:
```
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
```

###### router.js:
```
var datapool = require('./datapool');
 
function route(app) {
    datapool.loadRepositories();
    datapool.loadBussinesOperations(app);

    app.get('*', function(req, res){
        res.redirect('/');
    });
}

exports.redirect = route;
```

###### app.js:
```
var express    = require('express');
var expressCfg = require('./app/config/config.express.js'); 
var router     = require('./app/router'); 
var app        = express();
var config     = require('./app/config/config.json');

expressCfg.build(app, express);
router.redirect(app);

app.listen(config.port);
console.log('Listening on 3000');
```

*Ahora ya tenemos el servidor express montado, puedes ir a localhost:3000 y comprobar que la pagina web se sigue viendo exactamente igual*
*EL siguiente paso es crear el dto de sala. Primero creamos el fichero en models*
###### app/models/salaDto.js:
```
var mongoose = require('mongoose');    

var Sala = new mongoose.Schema({
    name: { type: String },
    size: { type: Number},
});

mongoose.model('Sala', Sala);
```

*El siguiente paso es crear la BLL y BO para sala:*
*La bll al final es la 'query' que ejecutaremos en mongo. Vamos a crear las necesarias para un CRUD:*
###### app/bll/salaBll.js:
```
const datapool = require('./../datapool');
const salaModel = datapool.getRepository('Sala');

exports.save = save;
exports.find = find;
exports.remove = remove;
exports.update = update;

function save(dto) {
	var sv = new salaModel(dto);
	return sv.save();
}

function find() {
	  return salaModel.find({}).lean().exec();
}

function remove (id){
	return salaModel.findOneAndRemove({ _id: datapool.id(id) });
}

function update (id, body){
    return salaModel.findOneAndUpdate({ _id: ObjectId(id) }, body);
}
```

*Y el BO al final son las acciones que tenemos que hacer cuando se llame a una ruto:*
###### app/bo/salaBo.js:
```
const co = require('co');
const handler = require('../helpers/error-express');
const salaBll = require('../bll/salaBll');

function StartPaths(app){

    app.post('/api/sala', createNewSala);
    app.get('/api/sala', getAllSala);
    app.delete('/api/sala', removeSala);
    app.update('/api/sala', updateSala);
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
```

*Como veras en la BO se hace uso de un helper este helper simplemente es una funcion para que los errores se tarten igual:*
###### app/helper/error-express.js:
```
module.exports = exports = function(res, errror) {
    res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos. **' + errror});
};
```

*Pues ya tenemos nuestro backend con node montado y funcionando :)*
*Ahora solo queda utilizarlo desde la vista!!!*

## Haciendo uso de nuestro backend desde Angular:
*Lo primero nos vamos a declarar un servicio desde el que atacaremos nuestras nuevas rutas:*
*Creamos la carpeta services y salaService.js*
```
$ mkdir public/js/services
$ touch public/js/services/salaService.js
```
*No te olvides de incluirlo en el index.html y en el Gruntfile.js*
```
<script src="/js/app.js"></script>
<!-- Services -->
<script src="/js/services/salaService.js"></script>
<!-- Controllers -->
<script src="/js/controllers/mainController.js"></script>
<script src="/js/controllers/salas/salasController.js"></script>

    *****
"src": ["public/js/app.js", "public/js/services/*",  "public/js/controllers/*"],
```

###### salaService.js:
```
app.service("salaService",
  function( $http, $q ) {
      var URL_SALAS = "/api/sala";
      return({
          getSalas: getSalas,
          createSala: createSala,
          removeSala: removeSala
      });
      
      function getSalas() {
          var request = $http({
              method: "get",
              url: URL_SALAS,
          });
          return( request.then( handleSuccess, handleError ) );
      }

      function createSala(dto) {
          var request = $http({
              method: "post",
              url: URL_SALAS,
              data: {
                sala: dto,
              }
          });
          return( request.then( handleSuccess, handleError ) );
      }

      function removeSala( id ) {
          var request = $http({
              method: "delete",
              url: URL_SALAS,
              headers: {'Content-Type': 'application/json'}, 
              data: {
                  id: id,
              }
          });
          return( request.then( handleSuccess, handleError ) );
      }
      
      function updateSala( id , dto) {
          var request = $http({
              method: "put",
              url: URL_SALAS,
              headers: {'Content-Type': 'application/json'}, 
              data: {
                  id: id,
                  sala: dto,
              }
          });
          return( request.then( handleSuccess, handleError ) );
      }

      function handleError( response ) {
          if (! angular.isObject( response.data ) ||
              ! response.data.message
              ) {
              return( $q.reject( "An unknown error occurred." ) );
          }
          return( $q.reject( response.data.message ) );
      }

      function handleSuccess( response ) {
          return( response.data );
      }
  }
);
```

*Ahora tenemos que añadir el servicio al controlador de salas*
```
app.controller("salasController", function appController($scope, salaService){...
```

*A continuacion añadimos una funcion que se llame con el ng-init para cargar nuestro array de salas:*
```
$scope.init = function () {
    salaService.getSalas()
     .then (function (data) {
       $scope.salaItems = data;
     });
  }
```

*Y en el template de salas:*
```
<div class="container" ng-init="init()">
```

*Ahora en addSalaToItems en la parte de añadir nueva sala llamamos a nuestro servicio otra vez: *
``` 
 if ($scope.editSalaIndex === undefined || $scope.editSalaIndex === null) {
    salaService.createSala({
    name: $scope.salaName,
    size: $scope.salaCap,
    })
    .then(function (data) {
        $scope.salaItems.push(data);
    });
} 
```
*Tenemos que cambiar del template de la vista el campo cap ahora se llama size:*
```
<tr ng-repeat="sala in salaItems">
            <td>{{sala.name}}</td>
            <td>{{sala.size}}</td>
            <td>
```

*La funcion deleteSala pasa a ser algo tal que asi:*
```
 $scope.deleteSala = function (index) {
    salaService.removeSala($scope.salaItems[index]._id)
      .then(function (data) {
        $scope.salaItems.splice(index, 1);
      });
  }
```

*Por ultimo el edit que es el else del if de crear es algo tal que asi:*
```
else {
      salaService.updateSala($scope.salaEditId, {
        name: $scope.salaName,
        size: $scope.salaCap,
      })
      .then(function (data) {
        $scope.salaItems.splice($scope.editSalaIndex, 0, {
          name: $scope.salaName,
          size: $scope.salaCap,
        });
        $scope.salaName = null; 
        $scope.salaCap= null;
      });
      $scope.editSalaIndex = undefined;
    }

    $scope.showForm = false;
    $scope.errorForm = false;
```

*Por ultimo nos hace falta guardarnos el id de la sala que vamos a editar:*
```
  $scope.editSala = function (sala, index) {
    $scope.salaName = sala.name; 
    $scope.salaCap= sala.size;
    $scope.salaEditId = sala._id;
    $scope.salaItems.splice(index, 1);
    $scope.showForm = true;
    $scope.editSalaIndex = index;
  }
```

*Vete a localhost que ya funciona todo: :)*
