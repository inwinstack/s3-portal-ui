import signUpModule from './signup/signup';
import signUpCtrl from './signup/signup.controller';
import signUpTemplate from './signup/signup.html';
import directives from '../../directives/email';
import app from './../../index.js';

describe('User sign up', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeDirective;
  let makeTemplate
  let $toast;
  let $state;
  let $auth;
  let $compile;
  let form;
  let $http;
  let AuthService;
  let $httpBackend;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _$compile_, _AuthService_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $httpBackend = _$httpBackend_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    $compile = _$compile_;

    AuthService = _AuthService_;

    makeTemplate = angular.element(signUpTemplate);

    $rootScope.credentials = { email: null};

    $compile(makeTemplate)($rootScope);

    form = $rootScope.signup.form;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast, AuthService);
    };
  }));
  describe('when fill a email in invalid format', function() {
    it('should be invalid', function() {  
      form.email.$setViewValue('eeeiii');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('eeeiii');

      form.email.$setViewValue('');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('');
  
      form.email.$setViewValue('chaoeninwinstack.com');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('chaoeninwinstack.com');
    });
  });
  describe('when fill a non-exist valid email', function() {
    it('should be valid', function() {
      form.email.$setViewValue('chaoen@inwinstack.com');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(true);
      expect(form.email.$viewValue).to.eq('chaoen@inwinstack.com');
    });
    it('should invoke ckeckEmail() in signup.controller and emailIsValid should be true', function() {
      const controller = makeController();
      form.email.$setViewValue('chaoen@inwinstack.com');
      const data = { email: form.email.$setViewValue };
      controller.form = { email: { '$valid': form.email.$valid }};
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(200);
      controller.checkEmail();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.emailIsValid).to.eq(true);
    });
  });
  describe('when fill a exist email', function() {
    it('should be valid', function() {
      form.email.$setViewValue('chaoen.l@inwinstack.com');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(true);
      expect(form.email.$viewValue).to.eq('chaoen.l@inwinstack.com');
      expect(form.$invalid).to.eq(true);
    });
    it('should invoke ckeckEmail() in signup.controller and emailIsValid should be false', function() {
      const controller = makeController();
      form.email.$setViewValue('chaoen.l@inwinstack.com');
      const data = { email: form.email.$setViewValue };
      controller.form = { email: { '$valid': form.email.$valid }};
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(403);
      controller.checkEmail();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.emailIsValid).to.eq(false);
    });
  });
  describe('when fill different text in password and password_confirmation', function() {
    it('should be invalid', function() {
      form.password.$setViewValue('abc1234');
      form.password_confirmation.$setViewValue('1234567');
      $rootScope.$digest();
      expect(form.password_confirmation.$valid).to.eq(false);
      expect(form.password_confirmation.$viewValue).to.eq('1234567');
      expect(form.password.$viewValue).to.eq('abc1234');
    });
  });
  describe('when fill same text in password and password_confirmation', function() {
    it('should be valid', function() {
      form.password.$setViewValue('abc1234');
      form.password_confirmation.$setViewValue('abc1234');
      $rootScope.$digest();
      expect(form.password_confirmation.$valid).to.eq(true);
      expect(form.password_confirmation.$viewValue).to.eq('abc1234');
      expect(form.password.$viewValue).to.eq('abc1234');
      expect(form.password.$valid).to.eq(true);
    });
  });
  describe('when sign up success', function() {
    it('should invoke $state.go and called by auth.signin', function() {
      const controller = makeController();
      const state = sinon.spy($state, 'go');
      const data = { email: 'chaoen@inwinstack.com', password: 'abc1234' };
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(200);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(state).to.have.been.calledWith('auth.signin');
    });
    it('should invoke $toast.show and called by Sign Up Success!', function() {
      const controller = makeController();
      const toast = sinon.spy($toast, 'show');
      const data = { email: 'chaoen@inwinstack.com', password: 'abc1234' };
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(200);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign Up Success!'); 
    });
  });
  describe('when sign up fail', function() {
    it('should let form.$submitted false', function() {
      const controller = makeController();
      const data = { email: 'chaoen.l@inwinstack.com', password: 'abc1234' };
      controller.credentials = data;
      controller.form = { '$submitted': true };
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(403);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.form.$submitted).to.eq(false);
    });
  });
})
