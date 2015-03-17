'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('impressum', {
        url: '/impressum',
        templateUrl: 'app/impressum/impressum.html',
        controller: 'ImpressumCtrl'
      });
  });