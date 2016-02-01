'use strict';

describe('Directive: osbTvFilmGuide', function () {

  // load the directive's module and view
  beforeEach(module('oneStepBeyondApp'));
  beforeEach(module('app/osbTvFilmGuide/osbTvFilmGuide.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<osb-tv-film-guide></osb-tv-film-guide>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the osbTvFilmGuide directive');
  }));
});