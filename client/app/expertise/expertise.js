'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('expertise', {
        url: '/our-expertise',
        templateUrl: 'app/expertise/expertise.html',
        controller: 'ExpertiseCtrl'
      });
  });