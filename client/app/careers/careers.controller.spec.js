'use strict';

describe('Controller: CareersCtrl', function () {

  // load the controller's module
  beforeEach(module('arimorcApp'));

  var CareersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CareersCtrl = $controller('CareersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
