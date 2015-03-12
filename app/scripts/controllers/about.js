'use strict';

/**
 * @ngdoc function
 * @name arimorcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the arimorcApp
 */
angular.module('arimorcApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
