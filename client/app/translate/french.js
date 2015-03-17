'use strict';

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph',
      'BUTTON_LANG_DE': 'Deutsch',
      'BUTTON_LANG_EN': 'English',
      'BUTTON_LANG_FR': 'Français'
    });
   
    $translateProvider.preferredLanguage('en');
  }]);

