'use strict';

angular.module('arimorcApp')
  .controller('FooterCtrl', function ($scope, $location) {

    $scope.isActive = function(route) {
      return (route === $location.path())? 'active' : '';
    };

  });