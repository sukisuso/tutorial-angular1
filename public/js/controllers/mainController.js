app.controller("appController", function appController($scope){
    $scope.helloWorld = "Hello world from Node.js and Angular-1";

    $scope.showText = null;
    $scope.init = function () {
        $scope.showText = false;
    };

});