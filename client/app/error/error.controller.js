'use strict';

angular.module('arimorcApp')
  .controller('ErrorCtrl', function ($scope, $state) {
    
    $scope.goTo = function(uri) {
      $state.go(uri);
    };
    
  });
