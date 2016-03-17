import signInModule from './signin';
import signInCtrl from './signin.controller';

describe('SignIn', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;

  const $auth = {};
  const $state = {};
  const $toast = {};
  const form = {};

  beforeEach(window.module('auth.signin'));

  beforeEach(inject(($q, _$rootScope_,$compile) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signInCtrl($auth, $state, $toast);
    };
  }));
  it('signin success unit test', function() {
    $auth.login = () => {};
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('login').once().returns(authDeferred.promise);
    authDeferred.resolve();

    const controller = makeController();

    $state.go = sinon.spy();
    $toast.show = sinon.spy();
    
    controller.submit();
    $rootScope.$digest();

    AuthMock.verify();
    chai.expect($state.go.called).to.eq(true);
    chai.expect($toast.show.called).to.eq(true);
  })
  it('signin fail unit test', function() {
    $auth.login = () => {};
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('login').once().returns(authDeferred.promise);
    authDeferred.reject();

    const controller = makeController();

    $state.go = sinon.spy();
    $toast.show = sinon.spy();
    controller.form = { '$submitted' : true };

    controller.submit();
    $rootScope.$digest();

    AuthMock.verify();
    chai.expect(controller.form.$submitted).to.eq(false);
    chai.expect($state.go.called).to.eq(false);
    chai.expect($toast.show.called).to.eq(false);
  })
})
