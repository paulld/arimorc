'use strict';

angular.module('arimorcApp')
  .controller('AboutUsCtrl', function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
    $('.read-bio').click(function(){
      $(this).parent().children('.biography').slideToggle();
      $(this).hide();
    })

  });
