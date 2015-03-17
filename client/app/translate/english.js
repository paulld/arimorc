'use strict';

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph',
      'BUTTON_LANG_DE': 'Deutsch',
      'BUTTON_LANG_EN': 'English',
      'BUTTON_LANG_FR': 'Français',
      'MENU_1': 'Home',
      'MENU_2': 'Our Expertise',
      'MENU_3': 'References',
      'MENU_4': 'About Us',
      'MENU_5': 'Contact Us',
      'MENU_6': 'We are hiring!',
      'MENU_7': 'Intranet',
      'MENU_8': 'Impressum'
    });
   
    $translateProvider.preferredLanguage('en');
  }]);

