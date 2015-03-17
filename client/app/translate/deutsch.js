angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('de', {
      'TITLE': 'Hallo',
      'FOO': 'Dies ist ein Paragraph',
      'BUTTON_LANG_DE': 'deutsch',
      'BUTTON_LANG_EN': 'englisch'
    });
  }]);

