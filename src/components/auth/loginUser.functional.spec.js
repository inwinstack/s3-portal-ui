import signInModule from './signin/signin';
import signInCtrl from './signin/signin.controller';
import signInTemplate from './signin/signin.html';
import directives from '../../directives/email';
import app from './../../index.js';

describe('User log in', function() {
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
  describe('when login with incorrect email and password', function() {
    it('should let controller.incorrect be true and form.$submitted be false', function() {
      const controller = makeController();
      const data = { email: 'chaoen.l@inwinstack.com', password: 'abc123'};
      controller.form = { '$submitted': true };
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/login', data).respond(401);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.form.$submitted).to.eq(false);
      expect(controller.incorrect).to.eq(true);
    });
  });
  describe('when login with correct email and password', function() {
    it('should invoke $state.go and called with dashboard', function() {
      const controller = makeController();
      const data = { email: 'chaoen.l@inwinstack.com', password: 'abc1234'};
      const state = sinon.spy($state, 'go');
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/login', data).respond(200);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(state).to.have.been.calledWith('dashboard');
    });
    it('should invoke $toast.show and called with Sign In Success!', function(){
      const controller = makeController();
      const data = { email: 'chaoen.l@inwinstack.com', password: 'abc1234'};
      const toast = sinon.spy($toast, 'show');
      controller.credentials = data;
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/login', data).respond(200);
      controller.submit();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign In Success!');  
    });
  });
});



