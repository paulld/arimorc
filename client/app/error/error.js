'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'app/error/error.html',
        controller: 'ErrorCtrl'
      });
  });