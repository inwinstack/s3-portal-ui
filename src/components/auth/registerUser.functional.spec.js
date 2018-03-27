import signUpModule from './signup/signup';
import signUpCtrl from './signup/signup.controller';
import signUpTemplate from './signup/signup.html';
import directives from '../../directives/email';
import app from './../../index.js';

describe('User sign up', function() {
  let $rootScope;
  let makeController;
  let $toast;
  let $state;
  let $auth;
  let $compile;
  let form;
  let $http;
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

    $compile(signUpTemplate)($rootScope);

    form = $rootScope.signup.form;

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast, AuthService);
    };
  }));
  describe('when fill a exist email', function() {
    it('should let emailIsValid be false and emailIsInValid be true', function() {
      const controller = makeController();
      controller.form = form;
      controller.form.email.$setViewValue = 'chaoen@inwinstack.com';
      const data = { email: controller.form.email.$viewValue };
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(403);
      controller.checkEmail();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.emailIsValid).to.eq(false);
      expect(controller.emailIsInvalid).to.eq(true);
    })
  })
  describe('when fill a non-exist email', function() {
    it('should let emailIsValid be ture and emailIsInValid be false', function() {
      const controller = makeController();
      controller.form = form;
      controller.form.email.$setViewValue= 'chaoen.l@inwinstack.com';
      const data = { email: controller.form.email.$viewValue };
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(200);
      controller.checkEmail();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.emailIsValid).to.eq(true);
      expect(controller.emailIsInvalid).to.eq(false);
    })
  })
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
      controller.form = form;
      controller.form.$submitted = true;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/register', data).respond(403);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.form.$submitted).to.eq(false);
    });
  });
})
