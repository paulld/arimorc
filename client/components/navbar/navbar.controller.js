'use strict';

angular.module('arimorcApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $translate, $state, $rootScope) {
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
      $rootScope.$emit('newLang', langKey);
    };

// user.watchUser = function() {
//     $rootScope.$emit('userDetails', user);
//   }
// 
    // watch and emit functions for UserService
  // $rootScope.$on('userDetails', function(event, args) {
  //   //console.log("In watch function header controller, args: ", args);
  //   $scope.user = args;
  // });


  });