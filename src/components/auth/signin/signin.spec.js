import signUpModule from './signin';
import signUpCtrl from './signin.controller';

describe('SignIn', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  
  const $auth = {};
  const $state = {};
  const $toast = {};
  const form = {};

  beforeEach(window.module('auth.signin'));

  beforeEach(inject(($q, _$rootScope_) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast);
    };
  }));

  it('signin success unit test', function() {
    $auth.login = () => {};
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('login').once().returns(authDeferred.promise);
    authDeferred.resolve();

    $state.go = sinon.spy();
    $toast.show = sinon.spy();

    const controller = makeController();
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

    $state.go = sinon.spy();
    $toast.show = sinon.spy();

    const controller = makeController();
    controller.form = { '$submitted' : true };

    controller.submit();
    $rootScope.$digest();

    AuthMock.verify();
    chai.expect(controller.form.$submitted).to.eq(false);
    chai.expect($state.go.called).to.eq(false);
    chai.expect($toast.show.called).to.eq(false);
  })
})
