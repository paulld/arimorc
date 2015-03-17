'use strict';

angular.module('arimorcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'app/contact-us/contact-us.html',
        controller: 'ContactUsCtrl'
      });
  });