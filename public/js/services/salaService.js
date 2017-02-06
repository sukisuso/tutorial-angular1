app.service("salaService",
  function( $http, $q ) {
      var URL_SALAS = "/api/sala";
      return({
          getSalas: getSalas,
          createSala: createSala,
          removeSala: removeSala,
          updateSala: updateSala,
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