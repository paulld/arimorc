'use strict';

describe('Controller: ImpressumCtrl', function () {

  // load the controller's module
  beforeEach(module('arimorcApp'));

  var ImpressumCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImpressumCtrl = $controller('ImpressumCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
