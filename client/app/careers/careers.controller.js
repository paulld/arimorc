'use strict';

angular.module('arimorcApp')
  .controller('CareersCtrl', function ($scope, $modal) {
    
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'offer.html',
        size: size
      });
     };

  });
