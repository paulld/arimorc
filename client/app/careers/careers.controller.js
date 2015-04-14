'use strict';

angular.module('arimorcApp')
  .controller('CareersCtrl', function ($scope, $modal, $translate, $rootScope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };

    var translateOffers = function () {
      $scope.offers = [];
      $translate([
        'CAREERS.OFFER_1.TITLE', 'CAREERS.OFFER_1.INTRO', 'CAREERS.OFFER_1.THE_FIRM.TITLE', 'CAREERS.OFFER_1.THE_FIRM.CONTENT', 'CAREERS.OFFER_1.THE_JOB.TITLE', 'CAREERS.OFFER_1.THE_JOB.CONTENT', 'CAREERS.OFFER_1.CONTACT_US.TITLE', 'CAREERS.OFFER_1.CONTACT_US.CONTENT',
        'CAREERS.OFFER_2.TITLE', 'CAREERS.OFFER_2.INTRO', 'CAREERS.OFFER_2.THE_FIRM.TITLE', 'CAREERS.OFFER_2.THE_FIRM.CONTENT', 'CAREERS.OFFER_2.THE_JOB.TITLE', 'CAREERS.OFFER_2.THE_JOB.CONTENT', 'CAREERS.OFFER_2.CONTACT_US.TITLE', 'CAREERS.OFFER_2.CONTACT_US.CONTENT',
        'CAREERS.OFFER_3.TITLE', 'CAREERS.OFFER_3.INTRO', 'CAREERS.OFFER_3.THE_FIRM.TITLE', 'CAREERS.OFFER_3.THE_FIRM.CONTENT', 'CAREERS.OFFER_3.THE_JOB.TITLE', 'CAREERS.OFFER_3.THE_JOB.CONTENT', 'CAREERS.OFFER_3.CONTACT_US.TITLE', 'CAREERS.OFFER_3.CONTACT_US.CONTENT',
        'CAREERS.OFFER_4.TITLE', 'CAREERS.OFFER_4.INTRO', 'CAREERS.OFFER_4.THE_FIRM.TITLE', 'CAREERS.OFFER_4.THE_FIRM.CONTENT', 'CAREERS.OFFER_4.THE_JOB.TITLE', 'CAREERS.OFFER_4.THE_JOB.CONTENT', 'CAREERS.OFFER_4.CONTACT_US.TITLE', 'CAREERS.OFFER_4.CONTACT_US.CONTENT',
        'CAREERS.OFFER_5.TITLE', 'CAREERS.OFFER_5.INTRO', 'CAREERS.OFFER_5.THE_FIRM.TITLE', 'CAREERS.OFFER_5.THE_FIRM.CONTENT', 'CAREERS.OFFER_5.THE_JOB.TITLE', 'CAREERS.OFFER_5.THE_JOB.CONTENT', 'CAREERS.OFFER_5.CONTACT_US.TITLE', 'CAREERS.OFFER_5.CONTACT_US.CONTENT',
        'CAREERS.OFFER_6.TITLE', 'CAREERS.OFFER_6.INTRO', 'CAREERS.OFFER_6.THE_FIRM.TITLE', 'CAREERS.OFFER_6.THE_FIRM.CONTENT', 'CAREERS.OFFER_6.THE_JOB.TITLE', 'CAREERS.OFFER_6.THE_JOB.CONTENT', 'CAREERS.OFFER_6.CONTACT_US.TITLE', 'CAREERS.OFFER_6.CONTACT_US.CONTENT',
        'CAREERS.OFFER_7.TITLE', 'CAREERS.OFFER_7.INTRO', 'CAREERS.OFFER_7.THE_FIRM.TITLE', 'CAREERS.OFFER_7.THE_FIRM.CONTENT', 'CAREERS.OFFER_7.THE_JOB.TITLE', 'CAREERS.OFFER_7.THE_JOB.CONTENT', 'CAREERS.OFFER_7.CONTACT_US.TITLE', 'CAREERS.OFFER_7.CONTACT_US.CONTENT',
        'CAREERS.OFFER_8.TITLE', 'CAREERS.OFFER_8.INTRO', 'CAREERS.OFFER_8.THE_FIRM.TITLE', 'CAREERS.OFFER_8.THE_FIRM.CONTENT', 'CAREERS.OFFER_8.THE_JOB.TITLE', 'CAREERS.OFFER_8.THE_JOB.CONTENT', 'CAREERS.OFFER_8.CONTACT_US.TITLE', 'CAREERS.OFFER_8.CONTACT_US.CONTENT',
        'CAREERS.OFFER_9.TITLE', 'CAREERS.OFFER_9.INTRO', 'CAREERS.OFFER_9.THE_FIRM.TITLE', 'CAREERS.OFFER_9.THE_FIRM.CONTENT', 'CAREERS.OFFER_9.THE_JOB.TITLE', 'CAREERS.OFFER_9.THE_JOB.CONTENT', 'CAREERS.OFFER_9.CONTACT_US.TITLE', 'CAREERS.OFFER_9.CONTACT_US.CONTENT',
        'CAREERS.OFFER_10.TITLE', 'CAREERS.OFFER_10.INTRO', 'CAREERS.OFFER_10.THE_FIRM.TITLE', 'CAREERS.OFFER_10.THE_FIRM.CONTENT', 'CAREERS.OFFER_10.THE_JOB.TITLE', 'CAREERS.OFFER_10.THE_JOB.CONTENT', 'CAREERS.OFFER_10.CONTACT_US.TITLE', 'CAREERS.OFFER_10.CONTACT_US.CONTENT'
        ]).then(function (translations) {
          
          for (var i=1; i<11; i++) {
            if (translations['CAREERS.OFFER_' + i + '.TITLE'] !== 'CAREERS.OFFER_' + i + '.TITLE') {
              $scope.offers.push({
                title:              translations['CAREERS.OFFER_' + i + '.TITLE'],
                intro:              translations['CAREERS.OFFER_' + i + '.INTRO'],
                the_firm_title:     translations['CAREERS.OFFER_' + i + '.THE_FIRM.TITLE'],
                the_firm_content:   translations['CAREERS.OFFER_' + i + '.THE_FIRM.CONTENT'],
                the_job_title:      translations['CAREERS.OFFER_' + i + '.THE_JOB.TITLE'],
                the_job_content:    translations['CAREERS.OFFER_' + i + '.THE_JOB.CONTENT'],
                contact_us_title:   translations['CAREERS.OFFER_' + i + '.CONTACT_US.TITLE'],
                contact_us_content: translations['CAREERS.OFFER_' + i + '.CONTACT_US.CONTENT']
              });
            }
          }
      });
    };
    translateOffers();

    $rootScope.$on('newLang', function() {
      translateOffers();
    });

    $scope.open = function (_offer) {
      $modal.open({
        templateUrl: 'offer.html',
        controller: 'OfferCtrl',
        size: 'lg',
        resolve: {
          offer: function() {
            return _offer;
          }
        }
      });
     };

  })
  .controller('OfferCtrl', function ($scope, offer) {
    $scope.offer = offer;
  });
