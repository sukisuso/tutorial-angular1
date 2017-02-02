app.controller("salasController", function appController($scope){

  $scope.showForm = false;
  $scope.errorForm = false;
  $scope.salaName = null; 
  $scope.salaCap= null; 
  $scope.salaItems = [];

  $scope.addSalaToItems = function () {
    if ( !$scope.salaName || !$scope.salaCap ) {
      $scope.errorForm = true;
      return;
    }

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

    $scope.salaName = null; 
    $scope.salaCap= null;
    $scope.showForm = false;
    $scope.errorForm = false;
  }


  $scope.deleteSala = function (index) {
    $scope.salaItems.splice(index, 1);
  }

  $scope.editSala = function (sala, index) {
    $scope.salaName = sala.name; 
    $scope.salaCap= sala.cap;
    $scope.salaItems.splice(index, 1);
    $scope.showForm = true;
    $scope.editSalaIndex = index;
  }
});