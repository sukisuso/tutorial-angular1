app.controller("salasController", function appController($scope, salaService){

  $scope.showForm = false;
  $scope.errorForm = false;
  $scope.salaName = null; 
  $scope.salaCap= null; 
  $scope.salaItems = [];

  $scope.init = function () {
    salaService.getSalas()
     .then (function (data) {
       $scope.salaItems = data;
     });
  }

  $scope.addSalaToItems = function () {
    if ( !$scope.salaName || !$scope.salaCap ) {
      $scope.errorForm = true;
      return;
    }

    if ($scope.editSalaIndex === undefined || $scope.editSalaIndex === null) {
      salaService.createSala({
        name: $scope.salaName,
        size: $scope.salaCap,
      })
        .then(function (data) {
           $scope.salaItems.push(data);
        });
    } else {
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
  }


  $scope.deleteSala = function (index) {
    salaService.removeSala($scope.salaItems[index]._id)
      .then(function (data) {
        $scope.salaItems.splice(index, 1);
      });
  }

  $scope.editSala = function (sala, index) {
    $scope.salaName = sala.name; 
    $scope.salaCap= sala.size;
    $scope.salaEditId = sala._id;
    $scope.salaItems.splice(index, 1);
    $scope.showForm = true;
    $scope.editSalaIndex = index;
  }
});