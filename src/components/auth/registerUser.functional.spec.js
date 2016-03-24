import signUpModule from './signup/signup';
import signUpCtrl from './signup/signup.controller';
import signUpTemplate from './signup/signup.html';
import directives from '../../directives/email';
import app from './../../index.js';

describe('register user functional test', function() {
  let $rootScope;
  let makeController;
  let makeDirective;
  let makeTemplate
  let $toast;
  let $state;
  let $auth;
  let $compile;
  let form;
  let AuthService;
  let $httpBackend;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_$rootScope_, _$toast_, _$state_, _$auth_, _$compile_, _AuthService_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $httpBackend = _$httpBackend_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    $compile = _$compile_;

    AuthService = _AuthService_;

    makeTemplate = angular.element(signUpTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.signup.form;

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast, AuthService);
    };
  }));
  it('signup form test', function() {
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

    form.email.$setViewValue('chaoen@inwinstack.com');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(true);
    expect(form.email.$viewValue).to.eq('chaoen@inwinstack.com');
    expect(form.$invalid).to.eq(true);

    const data = { email : form.email.$setViewValue };
    controller.form = { email: { '$valid': form.email.$valid }};
    controller.credentials = data;
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(403);
    controller.checkEmail();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(controller.emailIsValid).to.eq(false);

    form.email.$setViewValue('chaoen.l@inwinstack.com');
    $rootScope.$digest();
    expect(form.email.$valid).to.eq(true);
    expect(form.email.$viewValue).to.eq('chaoen.l@inwinstack.com');
    expect(form.$invalid).to.eq(true);
    
    data.email = form.email.$setViewValue;
    controller.credentials = data;
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(200);
    controller.checkEmail();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(controller.emailIsValid).to.eq(true);

    form.password.$setViewValue('abc1234');
    form.password_confirmation.$setViewValue('1234567');
    $rootScope.$digest();
    expect(form.password_confirmation.$valid).to.eq(false);
    expect(form.password_confirmation.$viewValue).to.eq('1234567');
    expect(form.password.$viewValue).to.eq('abc1234');
    expect(form.$invalid).to.eq(true);
    
    form.password_confirmation.$setViewValue('abc1234');
    $rootScope.$digest();
    expect(form.password_confirmation.$valid).to.eq(true);
    expect(form.password_confirmation.$viewValue).to.eq('abc1234');
    expect(form.password.$viewValue).to.eq('abc1234');
    expect(form.password.$valid).to.eq(true);
    expect(form.email.$valid).to.eq(true);
    expect(form.$invalid).to.eq(false);
    expect(controller.emailIsInvalid).to.eq(false);
  })
  it('controller submit test', function() {
    const controller = makeController();
    const state = sinon.spy($state, 'go');
    const toast = sinon.spy($toast, 'show');
    const data = { email: 'chaoen@inwinstack.com', password: 'abc1234' };
    controller.credentials = data;
    controller.form = { '$submitted': true };
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(422);
    controller.submit();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(state.called).to.eq(false);
    expect(toast.called).to.eq(false);
    expect(controller.form.$submitted).to.eq(false);

    data.email ='chaoen.l@inwinstack.com';
    controller.credentials = data;
    $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(200);
    controller.submit();
    $httpBackend.flush();
    $rootScope.$digest();
    expect(state).to.have.been.calledWith('auth.signin');
    expect(toast).to.have.been.calledWith('Sign Up Success!'); 
  })
})
