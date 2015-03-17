angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph',
      'BUTTON_LANG_DE': 'german',
      'BUTTON_LANG_EN': 'english'
    });
   
    $translateProvider.preferredLanguage('en');
  }]);

