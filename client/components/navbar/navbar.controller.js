'use strict';

angular.module('arimorcApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $translate, $state) {
    // $scope.menu = [{
    //   'title': 'Home',
    //   'link': '/'
    // }];

    // $scope.isCollapsed = true;
    // $scope.isLoggedIn = Auth.isLoggedIn;
    // $scope.isAdmin = Auth.isAdmin;
    // $scope.getCurrentUser = Auth.getCurrentUser;

    // $scope.logout = function() {
    //   Auth.logout();
    //   $location.path('/login');
    // };

    $scope.goTo = function(uri) {
      $state.go(uri);
    }

    $scope.isActive = function(route) {
      return (route === $location.path())? 'active' : '';
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  });