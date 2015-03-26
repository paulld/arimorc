'use strict';

angular.module('arimorcApp')
  .controller('ExpertiseCtrl', function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
  });
