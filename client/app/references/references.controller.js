'use strict';

angular.module('arimorcApp')
  .controller('ReferencesCtrl', function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
  });
