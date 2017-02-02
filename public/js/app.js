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