'use strict';

describe('Controller: ReferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('arimorcApp'));

  var ReferencesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReferencesCtrl = $controller('ReferencesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
