import signUpModule from './signup';
import signUpCtrl from './signup.controller';
import app from '../../../index.js';

describe('SignUp', function() {
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

  it('checkEmail success unit test', function() {
    const AuthServiceMock = sinon.mock(AuthService);
    const authDeferred = makeDeferred();
    AuthServiceMock.expects('checkEmail').returns(authDeferred.promise);
    authDeferred.resolve();
   
    const controller = makeController();

    controller.form = { email: {'$valid' : true }};
    controller.checkEmail();
    $rootScope.$digest();

    chai.expect(controller.emailIsValid).to.eq(true);
    chai.expect(controller.emailIsInvalid).to.eq(false);
    chai.expect(controller.isCheckEmail).to.eq(false);
  })
  it('checkEmail fail unit test', function() {
    const AuthServiceMock = sinon.mock(AuthService);
    const authDeferred = makeDeferred();
    AuthServiceMock.expects('checkEmail').returns(authDeferred.promise);
    authDeferred.reject();
    
    const controller = makeController();

    controller.form = { email: {'$valid' : true }};
    controller.checkEmail();
    $rootScope.$digest();

    chai.expect(controller.emailIsValid).to.eq(false);
    chai.expect(controller.emailIsInvalid).to.eq(true);
    chai.expect(controller.isCheckEmail).to.eq(false);
  })
  it('signup success unit test', function() {
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('signup').returns(authDeferred.promise);
    authDeferred.resolve();

    const controller = makeController();

    $state.go = sinon.spy();
    $toast.show = sinon.spy();
   
    controller.submit();
    $rootScope.$digest();

    chai.expect($state.go).to.have.been.calledWith('auth.signin');
    chai.expect($toast.show).to.have.been.calledWith('Sign Up Success!');
  })
  it('signup fail unit test', function() {
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('signup').returns(authDeferred.promise);
    authDeferred.reject();

    const controller = makeController();
    controller.form = { '$submitted': true };

    controller.submit();
    $rootScope.$digest();

    chai.expect(controller.form.$submitted).to.eq(false);
  })
})
