'use strict';

angular.module('arimorcApp')
  .controller('MainCtrl', function ($scope, $http, $state, $modal, $translate, $rootScope) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.goTo = function(uri) {
      $state.go(uri);
    }

    var translateArticles = function () {
      $translate([
        'HOME.NEWS.ARTICLE_1.TITLE', 'HOME.NEWS.ARTICLE_1.INTRO', 'HOME.NEWS.ARTICLE_1.CONTENT',
        'HOME.NEWS.ARTICLE_2.TITLE', 'HOME.NEWS.ARTICLE_2.INTRO', 'HOME.NEWS.ARTICLE_2.CONTENT',
        'HOME.NEWS.ARTICLE_3.TITLE', 'HOME.NEWS.ARTICLE_3.INTRO', 'HOME.NEWS.ARTICLE_3.CONTENT'
        ]).then(function (translations) {
          $scope.articles = [
            {
              title: translations['HOME.NEWS.ARTICLE_1.TITLE'],
              intro: translations['HOME.NEWS.ARTICLE_1.INTRO'],
              content: translations['HOME.NEWS.ARTICLE_1.CONTENT']
            },
            {
              title: translations['HOME.NEWS.ARTICLE_2.TITLE'],
              intro: translations['HOME.NEWS.ARTICLE_2.INTRO'],
              content: translations['HOME.NEWS.ARTICLE_2.CONTENT']
            },
            {
              title: translations['HOME.NEWS.ARTICLE_3.TITLE'],
              intro: translations['HOME.NEWS.ARTICLE_3.INTRO'],
              content: translations['HOME.NEWS.ARTICLE_3.CONTENT']
            }
          ];
      });
    };
    translateArticles();

    $rootScope.$on('newLang', function(event, args) {
      translateArticles();
    });

    $scope.open = function (_article) {
      var modalInstance = $modal.open({
        templateUrl: 'article.html',
        controller: 'ArticleCtrl',
        resolve: {
          article: function() {
            return _article;
          }
        }
      });
     };

  })
  .controller('ArticleCtrl', function ($scope, article) {
    $scope.article = article;
  });
