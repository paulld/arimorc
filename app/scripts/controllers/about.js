'use strict';

/**
 * @ngdoc function
 * @name arimorcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the arimorcApp
 */
angular.module('arimorcApp')
  .controller('AboutCtrl', function ($rootScope, $scope, $i18next) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    // 'use strict';

      $scope.hello = '';

      $rootScope.$on('i18nextLanguageChange', function () {

        $scope.$apply(function () {
          $scope.hello = $i18next('hello');
          $scope.sprintf = $i18next('both.sprintf', {postProcess: 'sprintf', sprintf: ['a','b','c','d']});
          $scope.content = $i18next('content');
        });

        console.log($scope.hello);

      });

      $scope.togglePatrick = function () {
        $i18next.options.postProcess = $i18next.options.postProcess === 'patrick' ? '' : 'patrick';
        // $i18next.$i18nextProvider.options.lng = 'dev';
      };

      $scope.lngEng = function () {
        $i18next.options.postProcess = 'lngEng';
        // $i18next.options.postProcess = $i18next.options.postProcess === 'lngEng' ? '' : 'lngEng';
      };


  });
