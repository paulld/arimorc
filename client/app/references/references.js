'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('references', {
        url: '/references',
        templateUrl: 'app/references/references.html',
        controller: 'ReferencesCtrl'
      });
  });