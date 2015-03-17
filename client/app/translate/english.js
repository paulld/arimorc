'use strict';

var translateEnglish = {
  EN_SELECTED: 'active',
  FR_SELECTED: '',
  DE_SELECTED: '',
  TITLE: 'Hello',
  FOO: 'This is a paragraph',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Home'
  },
  EXPERTISE: {
    MENU_TITLE: 'Our Expertise'
  },
  REFERENCES: {
    MENU_TITLE: 'References'
  },
  ABOUT: {
    MENU_TITLE: 'About Us'
  },
  CONTACT: {
    MENU_TITLE: 'Contact Us'
  },
  CAREERS: {
    MENU_TITLE: 'We are hiring!'
  },
  INTRANET: {
    MENU_TITLE: 'Intranet'
  },
  IMPRESSUM: {
    MENU_TITLE: 'Impressum'
  }
};

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', translateEnglish);
    $translateProvider.preferredLanguage('en');
  }]);
