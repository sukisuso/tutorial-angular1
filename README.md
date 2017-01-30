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