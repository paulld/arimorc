'use strict';

var translateFrench = {
  EN_SELECTED: '',
  FR_SELECTED: 'active',
  DE_SELECTED: '',
  TITLE: 'Hello',
  FOO: 'This is a paragraph',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Accueil'
  },
  EXPERTISE: {
    MENU_TITLE: 'Notre Expertise'
  },
  REFERENCES: {
    MENU_TITLE: 'Références'
  },
  ABOUT: {
    MENU_TITLE: 'A Propos'
  },
  CONTACT: {
    MENU_TITLE: 'Contacts'
  },
  CAREERS: {
    MENU_TITLE: 'Nous recrutons!'
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
    $translateProvider.translations('fr', translateFrench);
  }]);
