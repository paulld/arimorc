'use strict';

var translateGerman = {
  EN_SELECTED: '',
  FR_SELECTED: '',
  DE_SELECTED: 'active',
  TITLE: 'Hallo',
  FOO: 'Dies ist ein Paragraph',
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
    MENU_TITLE: 'About us'
  },
  CONTACT: {
    MENU_TITLE: 'Contact us'
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
    $translateProvider.translations('de', translateGerman);
  }]);
