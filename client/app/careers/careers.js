'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('careers', {
        url: '/careers',
        templateUrl: 'app/careers/careers.html',
        controller: 'CareersCtrl'
      });
  });