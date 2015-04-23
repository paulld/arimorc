'use strict';

angular.module('arimorcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'pascalprecht.translate',
  'smoothScroll'
])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/error');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('authInterceptor', ["$rootScope", "$q", "$cookieStore", "$location", function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])

  .run(["$rootScope", "$location", "Auth", "$anchorScroll", function ($rootScope, $location, Auth, $anchorScroll) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    // Force scroll on top when new page is loaded
    $rootScope.$on('$locationChangeSuccess', function() {
      $anchorScroll();
    });
  }])

  .directive('imageonload', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('load', function() {
          //call the function that was passed
          scope.$apply(attrs.imageonload);
        });
      }
    };
  });

'use strict';

angular.module('arimorcApp')
  .controller('AboutUsCtrl', ["$scope", function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
    $('.read-bio').click(function(){
      $(this).parent().children('.biography').slideToggle();
      $(this).hide();
    })

  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'app/about-us/about-us.html',
        controller: 'AboutUsCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$location", function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  }]);

'use strict';

angular.module('arimorcApp')
  .controller('SettingsCtrl', ["$scope", "User", "Auth", function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  }]);

'use strict';

angular.module('arimorcApp')
  .controller('SignupCtrl', ["$scope", "Auth", "$location", function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  }]);

'use strict';

angular.module('arimorcApp')
  .controller('AdminCtrl', ["$scope", "$http", "Auth", "User", function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('CareersCtrl', ["$scope", "$modal", "$translate", "$rootScope", function ($scope, $modal, $translate, $rootScope) {
    
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

  }])
  .controller('OfferCtrl', ["$scope", "offer", function ($scope, offer) {
    $scope.offer = offer;
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('careers', {
        url: '/careers',
        templateUrl: 'app/careers/careers.html',
        controller: 'CareersCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ClientsCtrl', ["$scope", function ($scope) {
    $scope.message = 'Hello';
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('clients', {
        url: '/clients',
        templateUrl: 'app/clients/clients.html',
        controller: 'ClientsCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ContactUsCtrl', ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {

    $scope.sentWithSuccess = false;
    $scope.sentWithError = false;
    $scope.formClass = 'not-sent';
    $scope.postData = {};

    $scope.postMail = function (contact) {
      if ($scope.contactForm.$invalid === true) {
        return;
      }

      $scope.postData = angular.copy(contact);
      $http.post('https://arimorc.herokuapp.com/api/contacts', $scope.postData)
        .success(function() {
          // Success message already sent
        })
        .error(function() {
          // Revert Success message if error
          $scope.sentWithError = true;
          $scope.sentWithSuccess = false;
          $scope.contat = angular.copy($scope.postData);
        });
      
      // Show Success message before asynchronous response
      $timeout(function(){
        $scope.sentWithSuccess = true;
        $scope.contact.name = '';
        $scope.contact.company = '';
        $scope.contact.email = '';
        $scope.contact.message = '';
        $scope.formClass = '';
      }, 1000);

    };
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'app/contact-us/contact-us.html',
        controller: 'ContactUsCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ErrorCtrl', ["$scope", "$state", function ($scope, $state) {
    
    $scope.goTo = function(uri) {
      $state.go(uri);
    };
    
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'app/error/error.html',
        controller: 'ErrorCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ExpertiseCtrl', ["$scope", function ($scope) {
    
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
    
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('expertise', {
        url: '/our-expertise',
        templateUrl: 'app/expertise/expertise.html',
        controller: 'ExpertiseCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ImpressumCtrl', function () {
  });

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('impressum', {
        url: '/impressum',
        templateUrl: 'app/impressum/impressum.html',
        controller: 'ImpressumCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('MainCtrl', ["$scope", "$http", "$state", "$modal", "$translate", "$rootScope", function ($scope, $http, $state, $modal, $translate, $rootScope) {
    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };

    $scope.goTo = function(uri) {
      $state.go(uri);
    };

    var translateArticles = function () {
      $scope.articles = [];
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
            if (translations['HOME.NEWS.ARTICLE_' + i + '.TITLE'] !== 'HOME.NEWS.ARTICLE_' + i + '.TITLE') {
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

    $rootScope.$on('newLang', function() {
      translateArticles();
    });

    $scope.open = function (_article) {
      $modal.open({
        templateUrl: 'article.html',
        controller: 'ArticleCtrl',
        resolve: {
          article: function() {
            return _article;
          }
        }
      });
     };

  }])
  .controller('ArticleCtrl', ["$scope", "article", function ($scope, article) {
    $scope.article = article;
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);
'use strict';

angular.module('arimorcApp')
  .controller('ReferencesCtrl', ["$scope", function ($scope) {
    
    $scope.loading = true;
    $scope.displayPage = function () {
      $scope.loading = false;
    };
    
  }]);

'use strict';

angular.module('arimorcApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('references', {
        url: '/references',
        templateUrl: 'app/references/references.html',
        controller: 'ReferencesCtrl'
      });
  }]);
'use strict';

var translateEnglish = {
  EN_SELECTED: 'active',
  FR_SELECTED: '',
  DE_SELECTED: '',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Home',
    INTRO: {
      TITLE: 'Welcome to Arimor Consulting',
      INTRO: 'We are an independent consultancy firm,<br>expert in SAP Financial Consolidation.<br>We provide support and assistance to our clients<br>in Germany, France and more, for the development and optimisation of their financial organisation.',
      TAGLINE_1: {
        KEYWORD: 'We are <span class="keyword">reliable</span>.',
        PARAGRAPH: 'You can count on each of us. Avoid the question or looking for someone to be blamed is never helping.',
        QUOTE: '"Simplicity is prerequisite for reliability."',
        AUTHOR: 'Edsger W. Dijkstra'
      },
      TAGLINE_2: {
        KEYWORD: 'We are <span class="keyword">committed</span>.',
        PARAGRAPH: 'We devote ourselves fully to the success of our customers and the project in which we are involved.',
        QUOTE: '"Unless commitment is made, there are only promises and hopes; but no plans."',
        AUTHOR: 'Peter F. Drucker'
      },
      TAGLINE_3: {
        KEYWORD: 'We are <span class="keyword">efficient</span>.',
        PARAGRAPH: 'Finding the solution is already good. Finding the best solution is great.',
        QUOTE: '"Progress isn\'t made by early risers. It\'s made by lazy men trying to find easier ways to do something."',
        AUTHOR: 'Robert A. Heinlein'
      },
      READ_MORE_BUTTON: 'See our Expertise'
    },
    NEWS: {
      TITLE: 'Recent News',
      READ_MORE_BUTTON: 'Read the full article',
      ARTICLE_1: {
        TITLE: 'Arimor Consulting races between the seas!',
        CONTENT: 'Race between the Seas... from Husum to Damp.</p><p>Arimor Consulting will participate in the next edition of "Lauf zwischen den Meeren", with a team of 10 people composed of collaborators and clients.</p><p>The federal state between the North Sea and the Baltic Sea is diverse and therefore unique, like no other federal state. The race between the seas is just as unique, where the participants discover the federal state between the seas – between Husum and Damp – together as a team, and cross it in race stages. A race, which not only connects the coasts of the North and Baltic Sea, but also the people. For the race between the seas, it is not only the individual performance that counts, but also the communal performance of the 700 teams, with up to ten athletes each from the recreational and professional sports sectors. The fastest relay teams require approx. 5 hours and 30 minutes for the 96.3 kilometres, and reach the finish line around 14.30.</p><p>More information here: <a href="http://en.lauf-zwischen-den-meeren.de/">http://en.lauf-zwischen-den-meeren.de/</a>'
      }
    }
  },
  EXPERTISE: {
    MENU_TITLE: 'Expertise',
    TITLE: 'Our Expertise',
    READ_MORE_BUTTON: 'Read More',
    PARAGRAPH: 'Arimor Consulting is the partner of financial services.<br>We work with our clients and support them for the long term in most of their projects.<br>Our flexibility, experience and commitment make Arimor Consulting an asset that fully meet your needs.<br>In our fields, and given the quality of our services, our pricing offer is one of the most competitive.',
    EXPERTISE_1: {
      TITLE: 'SAP FC implementation',
      PARAGRAPH_1: 'Arimor Consulting is expert in SAP FC and project management. Each of our consultant combines the technical and the operational skills. Our expertise is required:',
      PARAGRAPH_2: '',
      BULLET_1: 'When you need to switch from any (or no) consolidation system to SAP FC –  During a first phase, together with our experts, we analyze your requirements and define a concept. In a second step, Arimor Consulting is implementing the new system where you are involved. Finally, we are providing a FC landscape that has been well designed and tested with all the documentation so that you are able to maintain and develop independently.',
      BULLET_2: 'When you want to update your current SAP FC – Due to new standards (IFRS, FINREP…), internal new requirements or technical reasons (data safety, obsolescence…), Arimor Consulting is providing all the support you need from specific SQL development or IT solutions to Customers’ benchmark.',
      BULLET_3: 'When you need training on SAP FC – For users, administrators or developers, Arimor Consulting is providing you all the training you need in English, German or French.'
    },
    EXPERTISE_2: {
      TITLE: 'Reporting tool',
      PARAGRAPH_1: 'After many years working for small, medium and big companies, we found out major areas of improvement in the reporting processes. Arimor Consulting is developing for your own needs all kind of tool to assist you in this direction. All our tools are provided to be used either on MS office product (Excel, Access…) or Web, so that there is no additional licence cost but the time spent on it. The main kind of product are:',
      PARAGRAPH_2: '',
      BULLET_1: 'Steering tools on a Web basis (SQL, PHP, JAVA, CSS) to help consulting companies in their internal reporting by following time, expenses… with a workflow logic,',
      BULLET_2: 'Mapping tool on Access and/or Excel to process output files (csv, txt…), with or without interfacing, and generate flat files to be loaded in the destination tool (usually consolidation tool),',
      BULLET_3: 'Any calculation tool (usually on Excel but also on Access if the volume of data is too big) that could be relevant for you.'
    },
    EXPERTISE_3: {
      TITLE: 'Audit system',
      PARAGRAPH_1: 'As soon as you are wondering if your consolidation and reporting system have some efficiency issues, you need to ask for an Audit. Arimor Consulting is providing you this expertise on SAP FC and on HFM.',
      PARAGRAPH_2: '',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    },
    EXPERTISE_4: {
      TITLE: 'Closing support',
      PARAGRAPH_1: 'Each of our consultant is expert in IFRS consolidation. We can support you from Monitoring and analysis of consolidated packages, intercompany reconciliation or Pro forma simulations, to the elaboration of yor financial statements (including Statement of changes in equity and statement of cash flows).',
      PARAGRAPH_2: 'Arimor Consulting is working in partnership with one of the major actor of the consolidation in Europe.',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    }
  },
  REFERENCES: {
    MENU_TITLE: 'References',
    CLIENTS_TITLE: 'They Trust Us',
    PARTNERS_TITLE: 'We Work Together',
    CLIENT_1: {
      NAME: 'Deutsche Telekom',
      URL: 'https://www.telekom.com/home',
      IMG: 'assets/images/arimorc-clients-t-mobile.png',
      PROJECT_1: 'Implementation and specific development on SAP FC',  // Leave empty string if nil, do not delete this line
      PROJECT_2: 'Closing support (central + local)',                  // Leave empty string if nil, do not delete this line
      PROJECT_3: ''                                                    // Leave empty string if nil, do not delete this line
    },
    CLIENT_2: {
      NAME: 'Salzgitter AG',
      URL: 'http://www.salzgitter-ag.com/',
      IMG: 'assets/images/arimorc-clients-salzgitter.png',
      PROJECT_1: 'Technical support on SAP FC',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_3: {
      NAME: 'Keneo Sport Solutions',
      URL: 'http://www.keneo.com/',
      IMG: 'assets/images/arimorc-clients-keneo.png',
      PROJECT_1: 'Creation and development of internal reporting tool',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_4: {
      NAME: 'Storengy',
      URL: 'https://www.storengy.com/en/',
      IMG: 'assets/images/arimorc-clients-storengy.png',
      PROJECT_1: 'Creation of mapping + interfacing tool from SAP Finance to SAP FC',
      PROJECT_2: 'Closing support',
      PROJECT_3: ''
    },
    CLIENT_5: {
      NAME: 'Asklepios',
      URL: 'http://www.asklepios.com/Home_en.Asklepios',
      IMG: 'assets/images/arimorc-clients-asklepios.png',
      PROJECT_1: 'Specific development on SAP FC',
      PROJECT_2: 'Re-design of the FC landscape (DEV+PROD+TEST)',
      PROJECT_3: ''
    },
    PARTNER_1: {
      NAME: 'Horwáth Partners',
      URL: 'http://www.horvath-partners.com/de/home/',
      IMG: 'assets/images/arimorc-clients-horwath-partners.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_2: {
      NAME: 'Visea Consulting',
      URL: 'http://www.viseaconsulting.com/',
      IMG: 'assets/images/arimorc-clients-visea-consulting.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_3: {
      NAME: 'Ginini Groupe',
      URL: 'http://www.ginini-groupe.com/',
      IMG: 'assets/images/arimorc-clients-ginini-groupe.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    }
  },
  ABOUT_US: {
    MENU_TITLE: 'About Us',
    TITLE: 'About Arimor Consulting',
    INTRO: {
      TITLE: 'What we Do',
      PARAGRAPH_1: 'Our team is composed by multi and complementary skills\' members.<br>They are our wealth, our representatives and your partners.',
      PARAGRAPH_2: 'Highly qualified and expert in their area, they know and understand your problematics and they are able to deliver you tailored solutions.<br>We devote ourselves fully to the success of our customers and the project in which we are involved.',
      PARAGRAPH_3: 'ARIMOR Consulting was founded by Romaric Barthe in 2013.<br>Starting January 2014, Paul Schombara jumps on board and ARIMOR Consulting is soaring.'
    },
    TEAM: {
      TITLE: 'Meet our Team',
      R_BARTHE_BIO: 'Project management<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell, SQL development in SAP FC for specific requirement<br>Analysis and concept on SAP FC<br>Introduction\'s process of SAP FC: From conception, implementation to Historical Data Recovery, training and Go Live<br>Administration of consolidation systems (Financial and reporting process) (SAP FC, HFM)<br>Conception and realisation of reporting systems - Excel or Web<br>Financial Statements realisation and consolidation support',
      P_SCHOMBARA_BIO: 'Advisory of a global acting media group in generating internal and external financial statements<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell<br>Analysis and concept on SAP FC<br>Historical data recovery within a SAP FC implementation project<br>Experience in migrating from SAP FC Version 7.5 to 10.0 including test conception and cases and testing<br>Administration of data packages and consolidation preparation (including creation of scopes, exchange rate tables and consolidation definition)<br>Financial Information Management'
    }
  },
  CONTACT_US: {
    FOOTER_TITLE: 'Contact us',
    TITLE: 'Contact us',
    INTRO: 'Please leave us your details and we will contact you shortly.',
    PLACEHOLDERS: {
      NAME: 'Your Name',
      EMAIL: 'Your Email',
      COMPANY: 'Your Company',
      MESSAGE: 'Enter your Message'
    },
    SUBMIT: 'Send',
    EMPTY_FIELD_MESSAGE: 'Some required fields are missing. Please review your input.',
    SUCCESS_MESSAGE: 'Thank you for your message! We will come back to you as soon as possible.',
    ERROR_MESSAGE: 'Sorry, something went wrong. Please check your input and submit again.'
  },
  CAREERS: {
    MENU_TITLE: 'Careers',
    TITLE: 'We are hiring!',
    PARAGRAPH_1: 'We are a growing firm and are always looking for<br>talented people to grow our team.',
    PARAGRAPH_2: 'If you are highly motivated and entrepreneurial, with good communication skills, and a high level of commitment for excellence, we would love to have you on board!',
    PARAGRAPH_3: 'Have a look at our current job opening for for information.',
    SEE_OFFERS_BUTTON: 'See our current Job Openings',
    READ_MORE_BUTTON: 'Read the full Job Description',
    OFFER_1: {
      TITLE: 'Junior Consultant',
      INTRO: 'You are a "true consultant" right from day one, a full-fledged member of a project team. You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.',
      THE_FIRM: {
        TITLE: 'The firm',
        CONTENT: 'ARIMOR Consulting is a dynamic firm grounded in 2013. Member of a European network and highly specialized in the implementation of reporting & consolidation tool, we are supporting the financial services of major international groups operating in various sectors (Telecommunication, banking, energy, pharmaceutics, sports…).</p><p>ARIMOR Consulting is doing business in a niche market and is managed by operational people. Our reliability is increasing day by day and our growth is only limited by finding/ developing our business’ know-how!'
      },
      THE_JOB: {
        TITLE: 'The job',
        CONTENT: 'You are a "true consultant" right from day one, a full-fledged member of a project team.<br>You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.</p><p>You would make a successful candidate, if:</p><ul><li>You have a degree from a reputable university</li><li>You have strong analytical skills and are able to understand and interpret the underlying matters</li><li>You are highly motivated and entrepreneurial</li><li>You possess very good communication skills and commitment to pursue a professional career</li><li>You show a high level of commitment for excellence</li><li>You speak English fluently</li></ul><p>Skills in accounting and / or controlling as well as database logic (MS Access or any other cube), Excel & VBA will be for you a real leverage.'
      },
      CONTACT_US: {
        TITLE: 'Contact us',
        CONTENT: 'Mail: join@arimor-consulting.com'
      }
    }
  },
  INTRANET: {
    FOOTER_TITLE: 'Intranet'
  },
  CLIENTS: {
    FOOTER_TITLE: 'Clients',
    TITLE: 'Secured Client Access',
    CLIENT_1: {
      TITLE: 'Keneo Sport Solution',
      URL: 'http://keneo.arimor-consulting.com/'
    }
  },
  IMPRESSUM: {
    FOOTER_TITLE: 'Impressum',
    TITLE_1: 'Impressum',
    SUB_1: 'Angaben gemäss § 5 TMG:',
    PARAGRAPH_1_1: 'ARIMOR Consulting GmbH',
    PARAGRAPH_1_2: 'Graf-Recke-Strasse 211C',
    PARAGRAPH_1_3: '40237 Düsseldorf',
    SUB_2: 'Vertreten durch:',
    PARAGRAPH_2: 'Romaric Barthe',
    SUB_3: 'Kontakt:',
    PARAGRAPH_3_1: 'Telefon: +491741769093',
    PARAGRAPH_3_2:  'E-Mail: rbarthe@arimor-consulting.de',
    SUB_4: 'Registereintrag:',
    PARAGRAPH_4_1: 'Eintragung im Handelsregister.',
    PARAGRAPH_4_2:  'Registergericht: Düsseldorf',
    PARAGRAPH_4_3:  'Registernummer: 70989',
    SUB_5: 'Umsatzsteuer-ID:',
    PARAGRAPH_5_1: 'Umsatzsteuer-Identifikationsnummer gemäss §27 a Umsatzsteuergesetz:',
    PARAGRAPH_5_2:  'DE290997039',
    TITLE_2: 'Haftungsausschluss (Disclaimer)',
    SUB_6: 'Haftung für Inhalte',
    PARAGRAPH_6: 'Als Diensteanbieter sind wir gemäss § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    SUB_7: 'Haftung für Links',
    PARAGRAPH_7: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    SUB_8: 'Urheberrecht',
    PARAGRAPH_8: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
  },
  ERROR: {
    PARAGRAPH: 'Sorry, this page either no longer exists<br>or was never a page to begin with.',
    BACK_HOME_BUTTON: 'Back to Home'
  }
};

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', translateEnglish);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useLocalStorage();
  }]);

'use strict';

var translateFrench = {
  EN_SELECTED: '',
  FR_SELECTED: 'active',
  DE_SELECTED: '',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Home',
    INTRO: {
      TITLE: 'Bienvenue chez Arimor Consulting',
      INTRO: 'We are an independent consultancy firm,<br>expert in SAP Financial Consolidation.<br>We provide support and assistance to our clients<br>in Germany, France and more, for the development and optimisation of their financial organisation.',
      TAGLINE_1: {
        KEYWORD: 'We are <span class="keyword">reliable</span>.',
        PARAGRAPH: 'You can count on each of us. Avoid the question or looking for someone to be blamed is never helping.',
        QUOTE: '"Simplicity is prerequisite for reliability."',
        AUTHOR: 'Edsger W. Dijkstra'
      },
      TAGLINE_2: {
        KEYWORD: 'We are <span class="keyword">committed</span>.',
        PARAGRAPH: 'We devote ourselves fully to the success of our customers and the project in which we are involved.',
        QUOTE: '"Unless commitment is made, there are only promises and hopes; but no plans."',
        AUTHOR: 'Peter F. Drucker'
      },
      TAGLINE_3: {
        KEYWORD: 'We are <span class="keyword">efficient</span>.',
        PARAGRAPH: 'Finding the solution is already good. Finding the best solution is great.',
        QUOTE: '"Progress isn\'t made by early risers. It\'s made by lazy men trying to find easier ways to do something."',
        AUTHOR: 'Robert A. Heinlein'
      },
      READ_MORE_BUTTON: 'See our Expertise'
    },
    NEWS: {
      TITLE: 'Actualité récente',
      READ_MORE_BUTTON: 'Lire l\'article en entier',
      ARTICLE_1: {
        TITLE: 'Titre de l\'article 1 - 2014',
        CONTENT: 'Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Nunc interdum lacus sit amet orci. Pellentesque auctor neque nec urna. Fusce fermentum odio nec arcu.</p><p>Pellentesque auctor neque nec urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Duis vel nibh at velit scelerisque suscipit. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi.</p><p>Sed cursus turpis vitae tortor. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Quisque ut nisi.</p><p>Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Mauris sollicitudin fermentum libero. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Vestibulum fringilla pede sit amet augue. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p><p>Praesent ac massa at ligula laoreet iaculis. In auctor lobortis lacus. In turpis. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nam adipiscing.'
      }
    }
  },
  EXPERTISE: {
    MENU_TITLE: 'Expertise',
    TITLE: 'Notre Expertise',
    READ_MORE_BUTTON: 'Read More',
    PARAGRAPH: 'Arimor Consulting is the partner of financial services.<br>We work with our clients and support them for the long term in most of their projects.<br>Our flexibility, experience and commitment make Arimor Consulting an asset that fully meet your needs.<br>In our fields, and given the quality of our services, our pricing offer is one of the most competitive.',
    EXPERTISE_1: {
      TITLE: 'SAP FC implementation',
      PARAGRAPH_1: 'Arimor Consulting is expert in SAP FC and project management. Each of our consultant combines the technical and the operational skills. Our expertise is required:',
      PARAGRAPH_2: '',
      BULLET_1: 'When you need to switch from any (or no) consolidation system to SAP FC –  During a first phase, together with our experts, we analyze your requirements and define a concept. In a second step, Arimor Consulting is implementing the new system where you are involved. Finally, we are providing a FC landscape that has been well designed and tested with all the documentation so that you are able to maintain and develop independently.',
      BULLET_2: 'When you want to update your current SAP FC – Due to new standards (IFRS, FINREP…), internal new requirements or technical reasons (data safety, obsolescence…), Arimor Consulting is providing all the support you need from specific SQL development or IT solutions to Customers’ benchmark.',
      BULLET_3: 'When you need training on SAP FC – For users, administrators or developers, Arimor Consulting is providing you all the training you need in English, German or French.'
    },
    EXPERTISE_2: {
      TITLE: 'Reporting tool',
      PARAGRAPH_1: 'After many years working for small, medium and big companies, we found out major areas of improvement in the reporting processes. Arimor Consulting is developing for your own needs all kind of tool to assist you in this direction. All our tools are provided to be used either on MS office product (Excel, Access…) or Web, so that there is no additional licence cost but the time spent on it. The main kind of product are:',
      PARAGRAPH_2: '',
      BULLET_1: 'Steering tools on a Web basis (SQL, PHP, JAVA, CSS) to help consulting companies in their internal reporting by following time, expenses… with a workflow logic,',
      BULLET_2: 'Mapping tool on Access and/or Excel to process output files (csv, txt…), with or without interfacing, and generate flat files to be loaded in the destination tool (usually consolidation tool),',
      BULLET_3: 'Any calculation tool (usually on Excel but also on Access if the volume of data is too big) that could be relevant for you.'
    },
    EXPERTISE_3: {
      TITLE: 'Audit system',
      PARAGRAPH_1: 'As soon as you are wondering if your consolidation and reporting system have some efficiency issues, you need to ask for an Audit. Arimor Consulting is providing you this expertise on SAP FC and on HFM.',
      PARAGRAPH_2: '',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    },
    EXPERTISE_4: {
      TITLE: 'Closing support',
      PARAGRAPH_1: 'Each of our consultant is expert in IFRS consolidation. We can support you from Monitoring and analysis of consolidated packages, intercompany reconciliation or Pro forma simulations, to the elaboration of yor financial statements (including Statement of changes in equity and statement of cash flows).',
      PARAGRAPH_2: 'Arimor Consulting is working in partnership with one of the major actor of the consolidation in Europe.',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    }
  },
  REFERENCES: {
    MENU_TITLE: 'Références',
    CLIENTS_TITLE: 'Ils Nous Font Confiance',
    PARTNERS_TITLE: 'Nous Travaillons Ensemble',
    CLIENT_1: {
      NAME: 'Deutsche Telekom',
      URL: 'https://www.telekom.com/home',
      IMG: 'assets/images/arimorc-clients-t-mobile.png',
      PROJECT_1: 'Implementation and specific development on SAP FC',  // Leave empty string if nil, do not delete this line
      PROJECT_2: 'Closing support (central + local)',                  // Leave empty string if nil, do not delete this line
      PROJECT_3: ''                                                    // Leave empty string if nil, do not delete this line
    },
    CLIENT_2: {
      NAME: 'Salzgitter AG',
      URL: 'http://www.salzgitter-ag.com/',
      IMG: 'assets/images/arimorc-clients-salzgitter.png',
      PROJECT_1: 'Technical support on SAP FC',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_3: {
      NAME: 'Keneo Sport Solutions',
      URL: 'http://www.keneo.com/',
      IMG: 'assets/images/arimorc-clients-keneo.png',
      PROJECT_1: 'Creation and development of internal reporting tool',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_4: {
      NAME: 'Storengy',
      URL: 'https://www.storengy.com/en/',
      IMG: 'assets/images/arimorc-clients-storengy.png',
      PROJECT_1: 'Creation of mapping + interfacing tool from SAP Finance to SAP FC',
      PROJECT_2: 'Closing support',
      PROJECT_3: ''
    },
    CLIENT_5: {
      NAME: 'Asklepios',
      URL: 'http://www.asklepios.com/Home_en.Asklepios',
      IMG: 'assets/images/arimorc-clients-asklepios.png',
      PROJECT_1: 'Specific development on SAP FC',
      PROJECT_2: 'Re-design of the FC landscape (DEV+PROD+TEST)',
      PROJECT_3: ''
    },
    PARTNER_1: {
      NAME: 'Horwáth Partners',
      URL: 'http://www.horvath-partners.com/de/home/',
      IMG: 'assets/images/arimorc-clients-horwath-partners.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_2: {
      NAME: 'Visea Consulting',
      URL: 'http://www.viseaconsulting.com/',
      IMG: 'assets/images/arimorc-clients-visea-consulting.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_3: {
      NAME: 'Ginini Groupe',
      URL: 'http://www.ginini-groupe.com/',
      IMG: 'assets/images/arimorc-clients-ginini-groupe.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    }
  },
  ABOUT_US: {
    MENU_TITLE: 'A Propos de Nous',
    TITLE: 'About Arimor Consulting',
    INTRO: {
      TITLE: 'What we Do',
      PARAGRAPH_1: 'Our team is composed by multi and complementary skills\' members.<br>They are our wealth, our representatives and your partners.',
      PARAGRAPH_2: 'Highly qualified and expert in their area, they know and understand your problematics and they are able to deliver you tailored solutions.<br>We devote ourselves fully to the success of our customers and the project in which we are involved.',
      PARAGRAPH_3: 'ARIMOR Consulting was founded by Romaric Barthe in 2013.<br>Starting January 2014, Paul Schombara jumps on board and ARIMOR Consulting is soaring.'
    },
    TEAM: {
      TITLE: 'Meet our Team',
      R_BARTHE_BIO: 'Project management<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell, SQL development in SAP FC for specific requirement<br>Analysis and concept on SAP FC<br>Introduction\'s process of SAP FC: From conception, implementation to Historical Data Recovery, training and Go Live<br>Administration of consolidation systems (Financial and reporting process) (SAP FC, HFM)<br>Conception and realisation of reporting systems - Excel or Web<br>Financial Statements realisation and consolidation support',
      P_SCHOMBARA_BIO: 'Advisory of a global acting media group in generating internal and external financial statements<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell<br>Analysis and concept on SAP FC<br>Historical data recovery within a SAP FC implementation project<br>Experience in migrating from SAP FC Version 7.5 to 10.0 including test conception and cases and testing<br>Administration of data packages and consolidation preparation (including creation of scopes, exchange rate tables and consolidation definition)<br>Financial Information Management'
    }
  },
  CONTACT_US: {
    FOOTER_TITLE: 'Contacts',
    TITLE: 'Contactez-nous',
    INTRO: 'Please leave us your details and we will contact you shortly.',
    PLACEHOLDERS: {
      NAME: 'Nom',
      EMAIL: 'Adresse Email',
      COMPANY: 'Entreprise',
      MESSAGE: 'Votre Message'
    },
    SUBMIT: 'Envoyer',
    EMPTY_FIELD_MESSAGE: 'Certains champs du formulaire manquent ou n\'ont pas la bonne forme. Veuillez vérifier vos informations.',
    SUCCESS_MESSAGE: 'Merci pour votre message ! Nous vous répondrons dans les meilleurs délais.',
    ERROR_MESSAGE: 'Désolés, le message n\a pas été envoyé. Veuillez vérifier les champs du formulaire et le soumettre à nouveau.'
  },
  CAREERS: {
    MENU_TITLE: 'Carrières',
    TITLE: 'Nous recrutons!',
    PARAGRAPH_1: 'We are a growing firm and are always looking for<br>talented people to grow our team.',
    PARAGRAPH_2: 'If you are highly motivated and entrepreneurial, with good communication skills, and a high level of commitment for excellence, we would love to have you on board!',
    PARAGRAPH_3: 'Have a look at our current job opening for for information.',
    SEE_OFFERS_BUTTON: 'See our current Job Openings',
    READ_MORE_BUTTON: 'Read the full Job Description',
    OFFER_1: {
      TITLE: 'Junior Consultant',
      INTRO: 'You are a "true consultant" right from day one, a full-fledged member of a project team. You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.',
      THE_FIRM: {
        TITLE: 'The firm',
        CONTENT: 'ARIMOR Consulting is a dynamic firm grounded in 2013. Member of a European network and highly specialized in the implementation of reporting & consolidation tool, we are supporting the financial services of major international groups operating in various sectors (Telecommunication, banking, energy, pharmaceutics, sports…).</p><p>ARIMOR Consulting is doing business in a niche market and is managed by operational people. Our reliability is increasing day by day and our growth is only limited by finding/ developing our business’ know-how!'
      },
      THE_JOB: {
        TITLE: 'The job',
        CONTENT: 'You are a "true consultant" right from day one, a full-fledged member of a project team.<br>You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.</p><p>You would make a successful candidate, if:</p><ul><li>You have a degree from a reputable university</li><li>You have strong analytical skills and are able to understand and interpret the underlying matters</li><li>You are highly motivated and entrepreneurial</li><li>You possess very good communication skills and commitment to pursue a professional career</li><li>You show a high level of commitment for excellence</li><li>You speak English fluently</li></ul><p>Skills in accounting and / or controlling as well as database logic (MS Access or any other cube), Excel & VBA will be for you a real leverage.'
      },
      CONTACT_US: {
        TITLE: 'Contact us',
        CONTENT: 'Mail: join@arimor-consulting.com'
      }
    }
  },
  INTRANET: {
    FOOTER_TITLE: 'Intranet'
  },
  CLIENTS: {
    FOOTER_TITLE: 'Clients',
    TITLE: 'Lien Sécurisé Clients',
    CLIENT_1: {
      TITLE: 'Keneo Sport Solution',
      URL: 'http://keneo.arimor-consulting.com/'
    }
  },
  IMPRESSUM: {
    FOOTER_TITLE: 'Impressum',
    TITLE_1: 'Impressum',
    SUB_1: 'Angaben gemäss § 5 TMG:',
    PARAGRAPH_1_1: 'ARIMOR Consulting GmbH',
    PARAGRAPH_1_2: 'Graf-Recke-Strasse 211C',
    PARAGRAPH_1_3: '40237 Düsseldorf',
    SUB_2: 'Vertreten durch:',
    PARAGRAPH_2: 'Romaric Barthe',
    SUB_3: 'Kontakt:',
    PARAGRAPH_3_1: 'Telefon: +491741769093',
    PARAGRAPH_3_2:  'E-Mail: rbarthe@arimor-consulting.de',
    SUB_4: 'Registereintrag:',
    PARAGRAPH_4_1: 'Eintragung im Handelsregister.',
    PARAGRAPH_4_2:  'Registergericht: Düsseldorf',
    PARAGRAPH_4_3:  'Registernummer: 70989',
    SUB_5: 'Umsatzsteuer-ID:',
    PARAGRAPH_5_1: 'Umsatzsteuer-Identifikationsnummer gemäss §27 a Umsatzsteuergesetz:',
    PARAGRAPH_5_2:  'DE290997039',
    TITLE_2: 'Haftungsausschluss (Disclaimer)',
    SUB_6: 'Haftung für Inhalte',
    PARAGRAPH_6: 'Als Diensteanbieter sind wir gemäss § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    SUB_7: 'Haftung für Links',
    PARAGRAPH_7: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    SUB_8: 'Urheberrecht',
    PARAGRAPH_8: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
  },
  ERROR: {
    PARAGRAPH: 'Sorry, this page either no longer exists<br>or was never a page to begin with.',
    BACK_HOME_BUTTON: 'Back to Home'
  }
};

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('fr', translateFrench);
  }]);

'use strict';

var translateGerman = {
  EN_SELECTED: '',
  FR_SELECTED: '',
  DE_SELECTED: 'active',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Home',
    INTRO: {
      TITLE: 'Wilkommenn zu ArimorC',
      INTRO: 'We are an independent consultancy firm,<br>expert in SAP Financial Consolidation.<br>We provide support and assistance to our clients<br>in Germany, France and more, for the development and optimisation of their financial organisation.',
      TAGLINE_1: {
        KEYWORD: 'We are <span class="keyword">reliable</span>.',
        PARAGRAPH: 'You can count on each of us. Avoid the question or looking for someone to be blamed is never helping.',
        QUOTE: '"Simplicity is prerequisite for reliability."',
        AUTHOR: 'Edsger W. Dijkstra'
      },
      TAGLINE_2: {
        KEYWORD: 'We are <span class="keyword">committed</span>.',
        PARAGRAPH: 'We devote ourselves fully to the success of our customers and the project in which we are involved.',
        QUOTE: '"Unless commitment is made, there are only promises and hopes; but no plans."',
        AUTHOR: 'Peter F. Drucker'
      },
      TAGLINE_3: {
        KEYWORD: 'We are <span class="keyword">efficient</span>.',
        PARAGRAPH: 'Finding the solution is already good. Finding the best solution is great.',
        QUOTE: '"Progress isn\'t made by early risers. It\'s made by lazy men trying to find easier ways to do something."',
        AUTHOR: 'Robert A. Heinlein'
      },
      READ_MORE_BUTTON: 'See our Expertise'
    },
    NEWS: {
      TITLE: 'Recent News',
      READ_MORE_BUTTON: 'Read the full article',
      ARTICLE_1: {
        TITLE: 'Laufen Zwischen den Meeren',
        CONTENT: 'Sed hendrerit. Praesent adipiscing. Sed libero. Fusce neque. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Nunc interdum lacus sit amet orci. Nunc nulla. Duis leo. Aenean ut eros et nisl sagittis vestibulum.</p><p>Nam at tortor in tellus interdum sagittis. Nullam cursus lacinia erat. Curabitur nisi. Praesent turpis. Donec sodales sagittis magna.</p><p>Ut non enim eleifend felis pretium feugiat. Vestibulum dapibus nunc ac augue. Praesent adipiscing. Cras varius. In consectetuer turpis ut velit.</p><p>Vestibulum eu odio. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Curabitur blandit mollis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
      }
    }
  },
  EXPERTISE: {
    MENU_TITLE: 'Expertise',
    TITLE: 'Our Expertise',
    READ_MORE_BUTTON: 'Read More',
    PARAGRAPH: 'Arimor Consulting is the partner of financial services.<br>We work with our clients and support them for the long term in most of their projects.<br>Our flexibility, experience and commitment make Arimor Consulting an asset that fully meet your needs.<br>In our fields, and given the quality of our services, our pricing offer is one of the most competitive.',
    EXPERTISE_1: {
      TITLE: 'SAP FC implementation',
      PARAGRAPH_1: 'Arimor Consulting is expert in SAP FC and project management. Each of our consultant combines the technical and the operational skills. Our expertise is required:',
      PARAGRAPH_2: '',
      BULLET_1: 'When you need to switch from any (or no) consolidation system to SAP FC –  During a first phase, together with our experts, we analyze your requirements and define a concept. In a second step, Arimor Consulting is implementing the new system where you are involved. Finally, we are providing a FC landscape that has been well designed and tested with all the documentation so that you are able to maintain and develop independently.',
      BULLET_2: 'When you want to update your current SAP FC – Due to new standards (IFRS, FINREP…), internal new requirements or technical reasons (data safety, obsolescence…), Arimor Consulting is providing all the support you need from specific SQL development or IT solutions to Customers’ benchmark.',
      BULLET_3: 'When you need training on SAP FC – For users, administrators or developers, Arimor Consulting is providing you all the training you need in English, German or French.'
    },
    EXPERTISE_2: {
      TITLE: 'Reporting tool',
      PARAGRAPH_1: 'After many years working for small, medium and big companies, we found out major areas of improvement in the reporting processes. Arimor Consulting is developing for your own needs all kind of tool to assist you in this direction. All our tools are provided to be used either on MS office product (Excel, Access…) or Web, so that there is no additional licence cost but the time spent on it. The main kind of product are:',
      PARAGRAPH_2: '',
      BULLET_1: 'Steering tools on a Web basis (SQL, PHP, JAVA, CSS) to help consulting companies in their internal reporting by following time, expenses… with a workflow logic,',
      BULLET_2: 'Mapping tool on Access and/or Excel to process output files (csv, txt…), with or without interfacing, and generate flat files to be loaded in the destination tool (usually consolidation tool),',
      BULLET_3: 'Any calculation tool (usually on Excel but also on Access if the volume of data is too big) that could be relevant for you.'
    },
    EXPERTISE_3: {
      TITLE: 'Audit system',
      PARAGRAPH_1: 'As soon as you are wondering if your consolidation and reporting system have some efficiency issues, you need to ask for an Audit. Arimor Consulting is providing you this expertise on SAP FC and on HFM.',
      PARAGRAPH_2: '',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    },
    EXPERTISE_4: {
      TITLE: 'Closing support',
      PARAGRAPH_1: 'Each of our consultant is expert in IFRS consolidation. We can support you from Monitoring and analysis of consolidated packages, intercompany reconciliation or Pro forma simulations, to the elaboration of yor financial statements (including Statement of changes in equity and statement of cash flows).',
      PARAGRAPH_2: 'Arimor Consulting is working in partnership with one of the major actor of the consolidation in Europe.',
      BULLET_1: '',
      BULLET_2: '',
      BULLET_3: ''
    }
  },
  REFERENCES: {
    MENU_TITLE: 'References',
    CLIENTS_TITLE: 'They Trust Us',
    PARTNERS_TITLE: 'We Work Together',
    CLIENT_1: {
      NAME: 'Deutsche Telekom',
      URL: 'https://www.telekom.com/home',
      IMG: 'assets/images/arimorc-clients-t-mobile.png',
      PROJECT_1: 'Implementation and specific development on SAP FC',  // Leave empty string if nil, do not delete this line
      PROJECT_2: 'Closing support (central + local)',                  // Leave empty string if nil, do not delete this line
      PROJECT_3: ''                                                    // Leave empty string if nil, do not delete this line
    },
    CLIENT_2: {
      NAME: 'Salzgitter AG',
      URL: 'http://www.salzgitter-ag.com/',
      IMG: 'assets/images/arimorc-clients-salzgitter.png',
      PROJECT_1: 'Technical support on SAP FC',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_3: {
      NAME: 'Keneo Sport Solutions',
      URL: 'http://www.keneo.com/',
      IMG: 'assets/images/arimorc-clients-keneo.png',
      PROJECT_1: 'Creation and development of internal reporting tool',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    CLIENT_4: {
      NAME: 'Storengy',
      URL: 'https://www.storengy.com/en/',
      IMG: 'assets/images/arimorc-clients-storengy.png',
      PROJECT_1: 'Creation of mapping + interfacing tool from SAP Finance to SAP FC',
      PROJECT_2: 'Closing support',
      PROJECT_3: ''
    },
    CLIENT_5: {
      NAME: 'Asklepios',
      URL: 'http://www.asklepios.com/Home_en.Asklepios',
      IMG: 'assets/images/arimorc-clients-asklepios.png',
      PROJECT_1: 'Specific development on SAP FC',
      PROJECT_2: 'Re-design of the FC landscape (DEV+PROD+TEST)',
      PROJECT_3: ''
    },
    PARTNER_1: {
      NAME: 'Horwáth Partners',
      URL: 'http://www.horvath-partners.com/de/home/',
      IMG: 'assets/images/arimorc-clients-horwath-partners.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_2: {
      NAME: 'Visea Consulting',
      URL: 'http://www.viseaconsulting.com/',
      IMG: 'assets/images/arimorc-clients-visea-consulting.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    },
    PARTNER_3: {
      NAME: 'Ginini Groupe',
      URL: 'http://www.ginini-groupe.com/',
      IMG: 'assets/images/arimorc-clients-ginini-groupe.png',
      PROJECT_1: '',
      PROJECT_2: '',
      PROJECT_3: ''
    }
  },
  ABOUT_US: {
    MENU_TITLE: 'About Us',
    TITLE: 'About Arimor Consulting',
    INTRO: {
      TITLE: 'What we Do',
      PARAGRAPH_1: 'Our team is composed by multi and complementary skills\' members.<br>They are our wealth, our representatives and your partners.',
      PARAGRAPH_2: 'Highly qualified and expert in their area, they know and understand your problematics and they are able to deliver you tailored solutions.<br>We devote ourselves fully to the success of our customers and the project in which we are involved.',
      PARAGRAPH_3: 'ARIMOR Consulting was founded by Romaric Barthe in 2013.<br>Starting January 2014, Paul Schombara jumps on board and ARIMOR Consulting is soaring.'
    },
    TEAM: {
      TITLE: 'Meet our Team',
      R_BARTHE_BIO: 'Project management<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell, SQL development in SAP FC for specific requirement<br>Analysis and concept on SAP FC<br>Introduction\'s process of SAP FC: From conception, implementation to Historical Data Recovery, training and Go Live<br>Administration of consolidation systems (Financial and reporting process) (SAP FC, HFM)<br>Conception and realisation of reporting systems - Excel or Web<br>Financial Statements realisation and consolidation support',
      P_SCHOMBARA_BIO: 'Advisory of a global acting media group in generating internal and external financial statements<br>Implementation of SAP FC in regards of IFRS/FINREP consolidations, Setup of a multi dimensional data modell<br>Analysis and concept on SAP FC<br>Historical data recovery within a SAP FC implementation project<br>Experience in migrating from SAP FC Version 7.5 to 10.0 including test conception and cases and testing<br>Administration of data packages and consolidation preparation (including creation of scopes, exchange rate tables and consolidation definition)<br>Financial Information Management'
    }
  },
  CONTACT_US: {
    FOOTER_TITLE: 'Contact us',
    TITLE: 'Contact us',
    INTRO: 'Please leave us your details and we will contact you shortly.',
    PLACEHOLDERS: {
      NAME: 'Your Name',
      EMAIL: 'Your Email',
      COMPANY: 'Your Company',
      MESSAGE: 'Enter your Message'
    },
    SUBMIT: 'Send',
    EMPTY_FIELD_MESSAGE: 'Some required fields are missing. Please review your input.',
    SUCCESS_MESSAGE: 'Thank you for your message! We will come back to you as soon as possible.',
    ERROR_MESSAGE: 'Sorry, something went wrong. Please check your input and submit again.'
  },
  CAREERS: {
    MENU_TITLE: 'Careers',
    TITLE: 'We are hiring!',
    PARAGRAPH_1: 'We are a growing firm and are always looking for<br>talented people to grow our team.',
    PARAGRAPH_2: 'If you are highly motivated and entrepreneurial, with good communication skills, and a high level of commitment for excellence, we would love to have you on board!',
    PARAGRAPH_3: 'Have a look at our current job opening for for information.',
    SEE_OFFERS_BUTTON: 'See our current Job Openings',
    READ_MORE_BUTTON: 'Read the full Job Description',
    OFFER_1: {
      TITLE: 'Junior Consultant',
      INTRO: 'You are a "true consultant" right from day one, a full-fledged member of a project team. You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.',
      THE_FIRM: {
        TITLE: 'The firm',
        CONTENT: 'ARIMOR Consulting is a dynamic firm grounded in 2013. Member of a European network and highly specialized in the implementation of reporting & consolidation tool, we are supporting the financial services of major international groups operating in various sectors (Telecommunication, banking, energy, pharmaceutics, sports…).</p><p>ARIMOR Consulting is doing business in a niche market and is managed by operational people. Our reliability is increasing day by day and our growth is only limited by finding/ developing our business’ know-how!'
      },
      THE_JOB: {
        TITLE: 'The job',
        CONTENT: 'You are a "true consultant" right from day one, a full-fledged member of a project team.<br>You are involved in the analysis, integration and administration of reporting and consolidation tool.<br>You are supporting the financial services in decisions and processes to elaborate their financial statements.</p><p>You would make a successful candidate, if:</p><ul><li>You have a degree from a reputable university</li><li>You have strong analytical skills and are able to understand and interpret the underlying matters</li><li>You are highly motivated and entrepreneurial</li><li>You possess very good communication skills and commitment to pursue a professional career</li><li>You show a high level of commitment for excellence</li><li>You speak English fluently</li></ul><p>Skills in accounting and / or controlling as well as database logic (MS Access or any other cube), Excel & VBA will be for you a real leverage.'
      },
      CONTACT_US: {
        TITLE: 'Contact us',
        CONTENT: 'Mail: join@arimor-consulting.com'
      }
    }
  },
  INTRANET: {
    FOOTER_TITLE: 'Intranet'
  },
  CLIENTS: {
    FOOTER_TITLE: 'Clients',
    TITLE: 'Secured Client Access',
    CLIENT_1: {
      TITLE: 'Keneo Sport Solution',
      URL: 'http://keneo.arimor-consulting.com/'
    }
  },
  IMPRESSUM: {
    FOOTER_TITLE: 'Impressum',
    TITLE_1: 'Impressum',
    SUB_1: 'Angaben gemäss § 5 TMG:',
    PARAGRAPH_1_1: 'ARIMOR Consulting GmbH',
    PARAGRAPH_1_2: 'Graf-Recke-Strasse 211C',
    PARAGRAPH_1_3: '40237 Düsseldorf',
    SUB_2: 'Vertreten durch:',
    PARAGRAPH_2: 'Romaric Barthe',
    SUB_3: 'Kontakt:',
    PARAGRAPH_3_1: 'Telefon: +491741769093',
    PARAGRAPH_3_2:  'E-Mail: rbarthe@arimor-consulting.de',
    SUB_4: 'Registereintrag:',
    PARAGRAPH_4_1: 'Eintragung im Handelsregister.',
    PARAGRAPH_4_2:  'Registergericht: Düsseldorf',
    PARAGRAPH_4_3:  'Registernummer: 70989',
    SUB_5: 'Umsatzsteuer-ID:',
    PARAGRAPH_5_1: 'Umsatzsteuer-Identifikationsnummer gemäss §27 a Umsatzsteuergesetz:',
    PARAGRAPH_5_2:  'DE290997039',
    TITLE_2: 'Haftungsausschluss (Disclaimer)',
    SUB_6: 'Haftung für Inhalte',
    PARAGRAPH_6: 'Als Diensteanbieter sind wir gemäss § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    SUB_7: 'Haftung für Links',
    PARAGRAPH_7: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    SUB_8: 'Urheberrecht',
    PARAGRAPH_8: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
  },
  ERROR: {
    PARAGRAPH: 'Sorry, this page either no longer exists<br>or was never a page to begin with.',
    BACK_HOME_BUTTON: 'Back to Home'
  }
};

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('de', translateGerman);
  }]);

'use strict';

angular.module('arimorcApp')
  .factory('Auth', ["$location", "$rootScope", "$http", "User", "$cookieStore", "$q", function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  }]);

'use strict';

angular.module('arimorcApp')
  .factory('User', ["$resource", function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  }]);

'use strict';

angular.module('arimorcApp')
  .controller('FooterCtrl', ["$scope", "$location", "$state", function ($scope, $location, $state) {

    $scope.isActive = function(route) {
      return (route === $location.path())? 'active' : '';
    };

    $scope.goTo = function(uri) {
      $state.go(uri);
    };

    $scope.date = new Date();

  }]);
'use strict';

angular.module('arimorcApp')
  .factory('Modal', ["$rootScope", "$modal", function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  }]);

'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('arimorcApp')
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });
'use strict';

angular.module('arimorcApp')
  .controller('NavbarCtrl', ["$scope", "$location", "Auth", "$translate", "$state", "$rootScope", function ($scope, $location, Auth, $translate, $state, $rootScope) {
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
    };

    $scope.isActive = function(route) {
      return (route === $location.path())? 'active' : '';
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $rootScope.$emit('newLang', langKey);
    };

  }]);
angular.module('arimorcApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/about-us/about-us.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=section-default><header><h1>{{ 'ABOUT_US.TITLE' | translate }}</h1></header><div><h2 class=about-subtitle>{{ 'ABOUT_US.INTRO.TITLE' | translate }}</h2><div class=about-intro><img ng-src=assets/images/image-about-us.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_2' | translate \"></p><p ng-bind-html=\" 'ABOUT_US.INTRO.PARAGRAPH_3' | translate \"></p></div><button scroll-to=our-team offset=120 class=\"btn big-button down-button\"><span>{{ 'ABOUT_US.TEAM.TITLE' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><h2 class=about-subtitle id=our-team>{{ 'ABOUT_US.TEAM.TITLE' | translate }}</h2><div class=team-member-left><h3>Romaric Barthe</h3><img ng-src=assets/images/arimorc-team-rbarthe.jpg><p class=read-bio><span>Read Biography</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><p class=biography ng-bind-html=\" 'ABOUT_US.TEAM.R_BARTHE_BIO' | translate \"></p></div><div class=team-member-right><h3>Paul Schombara</h3><img ng-src=assets/images/arimorc-team-pschombara.jpg><p class=read-bio><span>Read Biography</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><p class=biography ng-bind-html=\" 'ABOUT_US.TEAM.P_SCHOMBARA_BIO' | translate \"></p></div></div></section></div>"
  );


  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Login</button> <a class=\"btn btn-default btn-lg btn-register\" href=/signup>Register</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-register\" href=/login>Login</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><p>The delete user and user index api routes are restricted to users with the 'admin' role.</p><ul class=list-group><li class=list-group-item ng-repeat=\"user in users\"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>"
  );


  $templateCache.put('app/careers/careers.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default careers\"><header><h1>{{ 'CAREERS.TITLE' | translate }}</h1></header><div class=expertise-intro><img ng-src=/assets/images/image-careers.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'CAREERS.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'CAREERS.PARAGRAPH_2' | translate \"></p><p ng-bind-html=\" 'CAREERS.PARAGRAPH_3' | translate \"></p></div><button scroll-to=offers offset=120 class=\"btn big-button down-button\"><span>{{ 'CAREERS.SEE_OFFERS_BUTTON' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><div class=\"row offers\" id=offers><div class=\"col-md-6 article-item\" ng-repeat=\"offer in offers\"><h3 ng-bind-html=offer.title></h3><p ng-bind-html=offer.intro class=article-intro></p><button class=\"btn big-button medium-button\" ng-click=open(offer)><span>{{ 'CAREERS.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section></div><script type=text/ng-template id=offer.html><h2 ng-bind-html=\"offer.title\" class=\"offer-title\"></h2>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.the_firm_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.the_firm_content\"></p>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.the_job_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.the_job_content\"></p>\n" +
    "\n" +
    "  <h3 ng-bind-html=\"offer.contact_us_title\"></h3>\n" +
    "  <p ng-bind-html=\"offer.contact_us_content\"></p></script>"
  );


  $templateCache.put('app/clients/clients.html',
    "<div class=col-md-12><section class=\"section-default references\"><header><h1>{{ 'CLIENTS.TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=assets/images/arimorc-clients-keneo.png><hr><div class=reference-info><a href=\"{{ 'CLIENTS.CLIENT_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-name><h3>{{ 'CLIENTS.CLIENT_1.TITLE' | translate }}</h3></div></div></div></div></div></section></div>"
  );


  $templateCache.put('app/contact-us/contact-us.html',
    "<div class=col-md-12><section class=section-default><header><h1>{{ 'CONTACT_US.TITLE' | translate }}</h1></header><div><p class=contact-form-success ng-hide=sentWithSuccess ng-bind-html=\" 'CONTACT_US.INTRO' | translate \"></p><p class=contact-form-success ng-show=sentWithSuccess ng-bind-html=\" 'CONTACT_US.SUCCESS_MESSAGE' | translate \"></p><p class=contact-form-error ng-show=sentWithError ng-bind-html=\" 'CONTACT_US.ERROR_MESSAGE' | translate \"></p><p class=contact-form-error ng-show=\"contactForm.$submitted && contactForm.$invalid && !sentWithSuccess\" ng-bind-html=\" 'CONTACT_US.EMPTY_FIELD_MESSAGE' | translate \"></p><!-- <ul>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.name.$invalid\">Name</li>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.email.$invalid\">Email</li>\n" +
    "        <li ng-show=\"contactForm.$submitted && contactForm.message.$invalid\">Message</li>\n" +
    "      </ul> --><form name=contactForm class=contact-form ng-class=formClass novalidate ng-hide=sentWithSuccess><div class=contact-form-left><input class=form-control name=name ng-model=contact.name placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.NAME' | translate }}\" required> <input class=form-control name=company ng-model=contact.company placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.COMPANY' | translate }}\"> <input class=form-control type=email name=email ng-model=contact.email placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.EMAIL' | translate }}\" required></div><div class=contact-form-right><textarea class=form-control name=message ng-model=contact.message placeholder=\"{{ 'CONTACT_US.PLACEHOLDERS.MESSAGE' | translate }}\" required>{{message}}</textarea><button class=\"btn big-button\" type=submit ng-click=postMail(contact)><span>{{ 'CONTACT_US.SUBMIT' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></form></div></section></div>"
  );


  $templateCache.put('app/error/error.html',
    "<div class=error><h1>404</h1><h2 ng-bind-html=\" 'ERROR.PARAGRAPH' | translate \"></h2><button href=/about-us class=\"btn big-button\" ng-click=\"goTo('main')\"><span>{{ 'ERROR.BACK_HOME_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div>"
  );


  $templateCache.put('app/expertise/expertise.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=section-default><header><h1>{{ 'EXPERTISE.TITLE' | translate }}</h1></header><div><div class=expertise-intro><img ng-src=/assets/images/image-expertise.jpg imageonload=displayPage()><div><div><p ng-bind-html=\" 'EXPERTISE.PARAGRAPH' | translate \"></p></div><button scroll-to=expertise-items offset=140 class=\"btn big-button down-button\"><span>{{ 'EXPERTISE.READ_MORE_BUTTON' | translate }}</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></button></div></div><div class=expertise-items id=expertise-items><div class=item><h2><span class=expertise-number>1</span> <span>{{ 'EXPERTISE.EXPERTISE_1.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.PARAGRAPH_2' | translate \"></p><ul><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_1' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_2' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_1.BULLET_3' | translate \"></li></ul></div></div><div class=item><h2><span class=expertise-number>2</span> <span>{{ 'EXPERTISE.EXPERTISE_2.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.PARAGRAPH_2' | translate \"></p><ul><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_1' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_2' | translate \"></li><li ng-bind-html=\" 'EXPERTISE.EXPERTISE_2.BULLET_3' | translate \"></li></ul></div></div><div class=item><h2><span class=expertise-number>3</span> <span>{{ 'EXPERTISE.EXPERTISE_3.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.PARAGRAPH_2' | translate \"></p><!-- <ul>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_1' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_2' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_3.BULLET_3' | translate \"></li>\n" +
    "            </ul> --></div></div><div class=item><h2><span class=expertise-number>4</span> <span>{{ 'EXPERTISE.EXPERTISE_4.TITLE' | translate }}</span></h2><p class=read-more><span>Read More</span> <svg id=down-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 13 22.636\" enable-background=\"new 0 0 13 22.636\" xml:space=preserve><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"17.381,5.229 6.345,17.407 -4.69,5.229 \"></polyline></svg></p><div class=content><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.PARAGRAPH_1' | translate \"></p><p ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.PARAGRAPH_2' | translate \"></p><!-- <ul>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_1' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_2' | translate \"></li>\n" +
    "              <li ng-bind-html=\" 'EXPERTISE.EXPERTISE_4.BULLET_3' | translate \"></li>\n" +
    "            </ul> --></div></div></div></div></section></div>"
  );


  $templateCache.put('app/impressum/impressum.html',
    "<div class=\"col-md-12 impressum\"><section class=section-default><header><h1>{{ 'IMPRESSUM.TITLE_1' | translate }}</h1></header><div><h2>{{ 'IMPRESSUM.SUB_1' | translate }}</h2><!-- use &sect; ? --><p>{{ 'IMPRESSUM.PARAGRAPH_1_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_1_2' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_1_3' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_2' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_2' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_3' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_3_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_3_2' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_4' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_4_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_4_2' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_4_3' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_5' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_5_1' | translate }}</p><p>{{ 'IMPRESSUM.PARAGRAPH_5_2' | translate }}</p></div></section><section class=section-default><header><h1>{{ 'IMPRESSUM.TITLE_2' | translate }}</h1></header><div><h2>{{ 'IMPRESSUM.SUB_6' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_6' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_7' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_7' | translate }}</p><h2>{{ 'IMPRESSUM.SUB_8' | translate }}</h2><p>{{ 'IMPRESSUM.PARAGRAPH_8' | translate }}</p></div></section></div>"
  );


  $templateCache.put('app/main/main.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default home-about\"><header><h1>{{ 'HOME.INTRO.TITLE' | translate }}</h1></header><div><carousel interval=6000><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_1.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-1.jpg imageonload=displayPage()></slide><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_2.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-2.jpg></slide><slide><div class=home-tagline><div class=home-tagline-inner><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.KEYWORD' | translate \" class=tagline-keyword></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.PARAGRAPH' | translate \" class=tagline-paragraph></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.QUOTE' | translate \" class=tagline-quote></p><p ng-bind-html=\" 'HOME.INTRO.TAGLINE_3.AUTHOR' | translate \" class=tagline-author></p></div></div><img ng-src=/assets/images/image-home-3.jpg></slide></carousel><div class=home-main-button><button href=/about-us class=\"btn big-button\" ng-click=\"goTo('expertise')\"><span>{{ 'HOME.INTRO.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section><section class=\"section-default home-news\"><header><h1>{{ 'HOME.NEWS.TITLE' | translate }}</h1></header><div class=row><div class=\"col-md-6 article-item\" ng-repeat=\"article in articles\"><h3 ng-bind-html=article.title></h3><p ng-bind-html=article.content class=article-intro></p><button class=\"btn big-button medium-button\" ng-click=open(article)><span>{{ 'HOME.NEWS.READ_MORE_BUTTON' | translate }}</span> <svg id=right-arrow version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=13px height=22.636px viewbox=\"0 0 17.079 29.738\" xml:space=preserve preserveaspectratio=\"xMinYMin meet\"><polyline fill=none stroke=#000000 stroke-miterlimit=10 points=\"0.336,0.371 16.334,14.869 0.336,29.367 \"></polyline></svg></button></div></div></section></div><script type=text/ng-template id=article.html><h3 ng-bind-html=\"article.title\"></h3>\n" +
    "  <p ng-bind-html=\"article.content\"></p></script>"
  );


  $templateCache.put('app/references/references.html',
    "<div ng-show=loading class=loading><img ng-src=/assets/images/loading-spinner.svg><div class=hide-footer></div></div><div class=col-md-12 ng-show=!loading><section class=\"section-default references\"><header><h1>{{ 'REFERENCES.CLIENTS_TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_1.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_1.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_1.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_1.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_2.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_2.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_2.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_2.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_2.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_3.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_3.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_3.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_3.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_3.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_4.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_4.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_4.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_4.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_4.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.CLIENT_5.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.CLIENT_5.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.CLIENT_5.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.CLIENT_5.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.CLIENT_5.PROJECT_3' | translate }}</li></ul></div></div></div></div></div></section></div><div class=col-md-12 ng-show=!loading><section class=\"section-default references\"><header><h1>{{ 'REFERENCES.PARTNERS_TITLE' | translate }}</h1></header><div class=row><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_1.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_1.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_1.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_1.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_1.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_2.IMG' | translate }}\"><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_2.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_2.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_2.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_2.PROJECT_3' | translate }}</li></ul></div></div></div></div><div class=\"col-lg-3 col-md-4 col-sm-6\"><div class=reference-item><div class=helper></div><img src=\"{{ 'REFERENCES.PARTNER_3.IMG' | translate }}\" imageonload=displayPage()><hr><div class=reference-info><a href=\"{{ 'REFERENCES.PARTNER_3.URL' | translate }}\"><span class=reference-link></span></a><div class=reference-info-projects><ul class=list-unstyled><li>{{ 'REFERENCES.PARTNER_3.PROJECT_1' | translate }}</li><li>{{ 'REFERENCES.PARTNER_3.PROJECT_2' | translate }}</li><li>{{ 'REFERENCES.PARTNER_3.PROJECT_3' | translate }}</li></ul></div></div></div></div></div></section></div>"
  );


  $templateCache.put('components/footer/footer.html',
    "<div ng-controller=FooterCtrl><div class=container><div class=copyright>&copy; {{date | date:'yyyy'}} - Arimor Consulting</div><ul class=\"footer-menu list-inline\"><li ng-class=\"isActive('/contact-us')\" ng-click=\"goTo('contact-us')\"><a href=\"\">{{ 'CONTACT_US.FOOTER_TITLE' | translate }}</a></li><!-- <li ng-class=\"isActive('/careers')\" ng-click=\"goTo('careers')\">\n" +
    "        <a href=\"\">{{ 'CAREERS.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><!-- <li>\n" +
    "        <a href=\"http://intranet.arimor-consulting.de/\">{{ 'INTRANET.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><!-- <li ng-class=\"isActive('/clients')\" ng-click=\"goTo('clients')\">\n" +
    "        <a href=\"\">{{ 'CLIENTS.FOOTER_TITLE' | translate }}</a>\n" +
    "      </li> --><li ng-class=\"isActive('/impressum')\" ng-click=\"goTo('impressum')\"><a href=\"\">{{ 'IMPRESSUM.FOOTER_TITLE' | translate }}</a></li></ul></div></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div ng-controller=NavbarCtrl><div id=header-top><div class=container><ul class=\"top-menu list-inline\"><li class=\"{{ 'EN_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('en')\" translate=BUTTON_LANG_EN href=#></a></li><li class=\"{{ 'DE_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('de')\" translate=BUTTON_LANG_DE href=#></a></li><li class=\"{{ 'FR_SELECTED' | translate}}\"><a ng-click=\"changeLanguage('fr')\" translate=BUTTON_LANG_FR href=#></a></li></ul><ul class=\"top-menu list-inline\"><li ng-class=\"isActive('/clients')\" ng-click=\"goTo('clients')\"><a href=\"\">{{ 'CLIENTS.FOOTER_TITLE' | translate }}</a></li><li><a href=\"http://intranet.arimor-consulting.de/\">{{ 'INTRANET.FOOTER_TITLE' | translate }}</a></li></ul></div></div><div id=header-main><div class=container><div class=logo><h1 class=sr-only>Arimor Consulting</h1><span class=helper></span> <img src=/assets/images/arimorc-logo.svg alt=\"ArimorC logo\" ng-click=\"goTo('main')\"></div><ul class=\"main-menu list-inline\"><li ng-class=\"isActive('/')\" ng-click=\"goTo('main')\"><a href=\"\">{{ 'HOME.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/our-expertise')\" ng-click=\"goTo('expertise')\"><a href=\"\">{{ 'EXPERTISE.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/references')\" ng-click=\"goTo('references')\"><a href=\"\">{{ 'REFERENCES.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/about-us')\" ng-click=\"goTo('about-us')\"><a href=\"\">{{ 'ABOUT_US.MENU_TITLE' | translate }}</a></li><li ng-class=\"isActive('/careers')\" ng-click=\"goTo('careers')\"><a href=\"\">{{ 'CAREERS.MENU_TITLE' | translate }}</a></li></ul></div></div></div><!-- \n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\">\n" +
    "            <a ng-href=\"{{item.link}}\">{{item.title}}</a>\n" +
    "        </li>\n" +
    "        <li ng-show=\"isAdmin()\" ng-class=\"{active: isActive('/admin')}\"><a href=\"/admin\">Admin</a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li><a ng-click=\"changeLanguage('de')\" translate=\"BUTTON_LANG_DE\" href=\"\"></a></li>\n" +
    "        <li><a ng-click=\"changeLanguage('en')\" translate=\"BUTTON_LANG_EN\" href=\"\"></a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a href=\"/signup\">Sign up</a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/login')}\"><a href=\"/login\">Login</a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p> </li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/settings')}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li>\n" +
    "      </ul>\n" +
    " -->"
  );

}]);

