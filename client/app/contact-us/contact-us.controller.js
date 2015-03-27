'use strict';

angular.module('arimorcApp')
  .controller('ContactUsCtrl', function ($scope, $http, $timeout) {

    $scope.sentWithSuccess = false;
    $scope.sentWithError = false;
    $scope.formClass = 'not-sent';
    $scope.postData = {};

    $scope.postMail = function (contact) {
      if ($scope.contactForm.$invalid === true) {
        return;
      }

      $scope.postData = angular.copy(contact);

      $http.post('/api/contacts', $scope.postData)
        .success(function() {
          // Success message already sent
        })
        .error(function() {
          // Revert Success message if error
          $scope.sentWithSuccess = true;
          $scope.sentWithSuccess = false;
          $scope.contat = angular.copy($scope.postData);
        });
      
      // Show Success message before asynchronous response
      $timeout(function(){
        $scope.sentWithSuccess = true;
        $scope.contact.name = '';
        $scope.contact.company = '';
        $scope.contact.email = '';
        $scope.contact.message = '';
        $scope.formClass = '';
      }, 1000);

    };
  });
