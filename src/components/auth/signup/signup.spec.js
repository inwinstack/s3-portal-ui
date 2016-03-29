import signUpModule from './signup';
import signUpCtrl from './signup.controller';
import app from '../../../index.js';

describe('SignUp controller unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let $toast;
  let $state;
  let $auth;
  let AuthService;

  const form = {};

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _AuthService_) => {
    $rootScope = _$rootScope_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    AuthService = _AuthService_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast, AuthService);
    };
  }));
  describe('when checkEmail success', function() {
    it('should let isCheckEmail and emailIsInvalid to be false, emailIsValid to be true', function() {
      const AuthServiceMock = sinon.mock(AuthService);
      const authDeferred = makeDeferred();
      AuthServiceMock.expects('checkEmail').returns(authDeferred.promise);
      authDeferred.resolve();
   
      const controller = makeController();

      controller.form = { email: {'$valid' : true }};
      controller.checkEmail();
      $rootScope.$digest();
     
      expect(controller.isCheckEmail).to.eq(false);
      expect(controller.emailIsInvalid).to.eq(false);
      expect(controller.emailIsValid).to.eq(true);
    });
  });
  describe('when checkEmail fail', function() {
    it('should let emailIsInvalid to be true, isCheckEmail and emailIsValid to be false', function() {
      const AuthServiceMock = sinon.mock(AuthService);
      const authDeferred = makeDeferred();
      AuthServiceMock.expects('checkEmail').returns(authDeferred.promise);
      authDeferred.reject();
    
      const controller = makeController();

      controller.form = { email: {'$valid' : true }};
      controller.checkEmail();
      $rootScope.$digest();

      expect(controller.isCheckEmail).to.eq(false);
      expect(controller.emailIsValid).to.eq(false);
      expect(controller.emailIsInvalid).to.eq(true);
    });
  });
  describe('when signup success', function() {
    it('should invoke $state.go and called with auth.signin', function() {
      const AuthMock = sinon.mock($auth);
      const authDeferred = makeDeferred();
      AuthMock.expects('signup').returns(authDeferred.promise);
      authDeferred.resolve();

      const controller = makeController();
      const state = sinon.spy($state, 'go');

      controller.submit();
      $rootScope.$digest();
      
      chai.expect(state).to.have.been.calledWith('auth.signin');
    });
    it('should invoke $toast.show and called with Sign Up Success!', function() {
      const AuthMock = sinon.mock($auth);
      const authDeferred = makeDeferred();
      AuthMock.expects('signup').returns(authDeferred.promise);
      authDeferred.resolve();

      const controller = makeController();
      const toast = sinon.spy($toast, 'show');
   
      controller.submit();
      $rootScope.$digest();

      chai.expect(toast).to.have.been.calledWith('Sign Up Success!');
    });
  });
  describe('when signup fail', function() {
    it('should let controller.form.$submitted be false', function() {
      const AuthMock = sinon.mock($auth);
      const authDeferred = makeDeferred();
      AuthMock.expects('signup').returns(authDeferred.promise);
      authDeferred.reject();

      const controller = makeController();
      controller.form = { '$submitted': true };

      controller.submit();
      $rootScope.$digest();

      expect(controller.form.$submitted).to.eq(false);
    });
  });
});
