'use strict';

angular.module('arimorcApp')
  .controller('ExpertiseCtrl', function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };

    $('.item .read-more').click(function(){
      $(this).parent().children('.content').slideToggle();
      $(this).hide();
    })
    
  });
