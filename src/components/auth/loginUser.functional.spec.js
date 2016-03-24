import signInModule from './signin/signin';
import signInCtrl from './signin/signin.controller';
import signInTemplate from './signin/signin.html';
import directives from '../../directives/email';
import app from './../../index.js';

describe('login user functional test', function() {
  let $rootScope;
  let makeController;
  let makeTemplate;
  let $toast;
  let $state;
  let $auth;
  let $compile;
  let form;
  let $httpBackend;
  
  beforeEach(angular.mock.module('app'));
 
  beforeEach(inject((_$rootScope_, _$toast_, _$state_, _$auth_, _$compile_, _$httpBackend_) => {
    $rootScope = _$rootScope_;
    
    $httpBackend = _$httpBackend_;
  
    $toast = _$toast_;
  
    $state = _$state_;
  
    $auth = _$auth_;

    $compile = _$compile_;

    makeTemplate = angular.element(signInTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.signin.form;

    makeController = () => {
      return new signInCtrl($auth, $state, $toast);
    };
}));
  it('signin form test', function() {
    const controller = makeController();

    form.email.$setViewValue('eeeiii');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(false);
    expect(form.email.$viewValue).to.eq('eeeiii');
    expect(form.$invalid).to.eq(true);

    form.email.$setViewValue('');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(false);
    expect(form.email.$viewValue).to.eq('');
    expect(form.$invalid).to.eq(true);

    form.email.$setViewValue('chaoeninwinstack.com');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(false);
    expect(form.email.$viewValue).to.eq('chaoeninwinstack.com');
    expect(form.$invalid).to.eq(true);

    form.email.$setViewValue('chaoen.l@inwinstack.com');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(true);
    expect(form.email.$viewValue).to.eq('chaoen.l@inwinstack.com');
    expect(form.$invalid).to.eq(true);

    form.password.$setViewValue('');
    $rootScope.$digest();
    expect(form.password.$valid).to.eq(false);
    expect(form.password.$viewValue).to.eq('');
    expect(form.$invalid).to.eq(true);

    form.password.$setViewValue('abc123');
    $rootScope.$digest();
    expect(form.password.$valid).to.eq(true);
    expect(form.password.$viewValue).to.eq('abc123');
    expect(form.$invalid).to.eq(false);
  });
  it('signin submit test', function() {
    const controller = makeController();
    const state = sinon.spy($state, 'go');
    const toast = sinon.spy($toast, 'show');
    const data = { email: 'chaoen.l@inwinstack.com', password: 'abc123'};

    controller.form = { '$submitted': true };
    controller.credentials = data;
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/login', data).respond(401);
    controller.submit();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(controller.form.$submitted).to.eq(false);
    expect(controller.incorrect).to.eq(true);

    data.password = 'abc1234';
    controller.credentials = data;
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/login', data).respond(200);
    controller.submit();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(state).to.have.been.calledWith('dashboard');
    expect(toast).to.have.been.calledWith('Sign In Success!');
  });
})



