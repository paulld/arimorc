'use strict';

angular.module('arimorcApp')
  .controller('ContactUsCtrl', function ($scope, $http, $timeout) {

    $scope.sentWithSuccess = false;
    $scope.sentWithError = false;

    $scope.postMail = function () {      
      var postData = {
        name: $scope.name,
        company: $scope.company,
        email: $scope.email,
        message: $scope.message
      };
      $http.post('/api/contacts', postData).
        success(function(data) {
        }).
        error(function(data) {
          // Revert Success message if error
          $scope.sentWithSuccess = true;
          $scope.sentWithSuccess = false;
          $scope.name = postData.name;
          $scope.company = postData.company;
          $scope.email = postData.email;
          $scope.message = postData.message;
        });
      
      // Show Success message before asynchronous response
      $timeout(function(){
        $scope.sentWithSuccess = true;
        $scope.name = '';
        $scope.company = '';
        $scope.email = '';
        $scope.message = '';
      }, 1000);

    };
  });
