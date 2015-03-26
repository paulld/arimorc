'use strict';

angular.module('arimorcApp')
  .controller('CareersCtrl', function ($scope, $modal) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'offer.html',
        size: size
      });
     };

  });
