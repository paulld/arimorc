'use strict';

describe('Controller: ExpertiseCtrl', function () {

  // load the controller's module
  beforeEach(module('arimorcApp'));

  var ExpertiseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpertiseCtrl = $controller('ExpertiseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
