'use strict';

angular.module('arimorcApp')
  .controller('ExpertiseCtrl', function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };

    $('.item .read-more').click(function(){
      $(this).parent().children('.content').slideToggle();
      // $(this).parent().attr('id', 'read-less');
      $(this).hide();
    });

    // $('#read-less').click(function(){
      // $('#read-less').hide().removeAttr('id', 'read-less');
      // console.log('hi');
      // $(this).parent().slideToggle();
      // $(this).parent().removeClass('visible');
      // $(this).parent().parent().children('.read-more').show();
      // $(this).hide();
    // });
    
  });
