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
    $scope.articles = [];

    var translateArticles = function () {
      $translate([
        'HOME.NEWS.ARTICLE_1.TITLE', 'HOME.NEWS.ARTICLE_1.CONTENT',
        'HOME.NEWS.ARTICLE_2.TITLE', 'HOME.NEWS.ARTICLE_2.CONTENT',
        'HOME.NEWS.ARTICLE_3.TITLE', 'HOME.NEWS.ARTICLE_3.CONTENT',
        'HOME.NEWS.ARTICLE_4.TITLE', 'HOME.NEWS.ARTICLE_4.CONTENT',
        'HOME.NEWS.ARTICLE_5.TITLE', 'HOME.NEWS.ARTICLE_5.CONTENT',
        'HOME.NEWS.ARTICLE_6.TITLE', 'HOME.NEWS.ARTICLE_6.CONTENT',
        'HOME.NEWS.ARTICLE_7.TITLE', 'HOME.NEWS.ARTICLE_7.CONTENT',
        'HOME.NEWS.ARTICLE_8.TITLE', 'HOME.NEWS.ARTICLE_8.CONTENT',
        'HOME.NEWS.ARTICLE_9.TITLE', 'HOME.NEWS.ARTICLE_9.CONTENT',
        'HOME.NEWS.ARTICLE_10.TITLE', 'HOME.NEWS.ARTICLE_10.CONTENT'
        ]).then(function (translations) {
          
          for (var i=1; i<11; i++) {
            console.log(i);
            if (translations['HOME.NEWS.ARTICLE_' + i + '.TITLE'] != 'HOME.NEWS.ARTICLE_' + i + '.TITLE') {
              console.log('inside', i);
              $scope.articles.push({
                title: translations['HOME.NEWS.ARTICLE_' + i + '.TITLE'],
                content: translations['HOME.NEWS.ARTICLE_' + i + '.CONTENT']
              });
            }
          }

          // $scope.articles = [
          //   {
          //     title: translations['HOME.NEWS.ARTICLE_1.TITLE'],
          //     content: translations['HOME.NEWS.ARTICLE_1.CONTENT']
          //   },
          //   {
          //     title: translations['HOME.NEWS.ARTICLE_2.TITLE'],
          //     content: translations['HOME.NEWS.ARTICLE_2.CONTENT']
          //   },
          //   {
          //     title: translations['HOME.NEWS.ARTICLE_3.TITLE'],
          //     content: translations['HOME.NEWS.ARTICLE_3.CONTENT']
          //   }
          // ];
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
