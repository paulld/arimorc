'use strict';

angular.module('arimorcApp')
  .controller('FooterCtrl', function ($scope, $location, $state) {

    $scope.isActive = function(route) {
      return (route === $location.path())? 'active' : '';
    };

    $scope.goTo = function(uri) {
      $state.go(uri);
    }

    $scope.date = new Date();

  });