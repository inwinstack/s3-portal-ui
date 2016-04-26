import signInModule from './signin';
import signInCtrl from './signin.controller';
import app from '../../../index.js';

describe('SignIn', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let $toast;
  let $state;
  let $auth;

  beforeEach(window.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_) => {
    $rootScope = _$rootScope_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signInCtrl($auth, $state, $toast);
    };
  }));
  it('signin success unit test', function() {
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('login').returns(authDeferred.promise);
    authDeferred.resolve();

    const controller = makeController();

    const state = sinon.spy($state, 'go');
    const toast = sinon.spy($toast, 'show');
    
    controller.submit();
    $rootScope.$digest();

    chai.expect(state).to.have.been.calledWith('dashboard');
    chai.expect(toast).to.have.been.calledWith('Sign In Success!');
  })
  it('signin fail unit test', function() {
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('login').returns(authDeferred.promise);
    authDeferred.reject();

    const controller = makeController();

    controller.form = { '$submitted' : true };

    controller.submit();
    $rootScope.$digest();

    chai.expect(controller.incorrect).to.eq(true);
    chai.expect(controller.form.$submitted).to.eq(false);
    
  })
})
