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
 if (!$scope.editSalaIndex) {
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