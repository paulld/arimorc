'use strict';

/**
 * @ngdoc overview
 * @name arimorcApp
 * @description
 * # arimorcApp
 *
 * Main module of the application.
 */
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
  
  // 'use strict';

    /*jshint unused:false */
    window.i18n.addPostProcessor('patrick', function (value, key, options) {
      //https://www.youtube.com/watch?v=YSzOXtXm8p0
      return 'No, this is Patrick!';
    });

    window.i18n.addPostProcessor('lngEng', function (value, key, options) {
      //https://www.youtube.com/watch?v=YSzOXtXm8p0
      $i18nextProvider.options.lng = 'dev';
      console.log('hihi');
    });
    /*jshint unused:true */


  $i18nextProvider.options = {
    lng: 'de',
    useCookie: false,
    useLocalStorage: false,
    fallbackLng: 'dev',
    resGetPath: '../locales/__lng__/__ns__.json',
    defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next
  };
}]);


angular
  .module('arimorcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'jm.i18next'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
  });
