import signUpModule from './signup';
import signUpCtrl from './signup.controller';

describe('SignUp', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  
  const $auth = {};
  const $state = {};
  const $toast = {};
  const form = {};

  beforeEach(window.module('signup'));

  beforeEach(inject(($q, _$rootScope_) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast);
    };
  }));

  it('signup success unit test', function() {
    $auth.signup = () => {};
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('signup').once().returns(authDeferred.promise);
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
  it('signup fail unit test', function() {
    $auth.signup = () => {};
    const AuthMock = sinon.mock($auth);
    const authDeferred = makeDeferred();
    AuthMock.expects('signup').once().returns(authDeferred.promise);
    authDeferred.reject();

    $state.go = sinon.spy();
    $toast.show = sinon.spy();

    const controller = makeController();
    controller.form = { '$submitted': true };

    controller.submit();
    $rootScope.$digest();

    AuthMock.verify();
    chai.expect(controller.form.$submitted).to.eq(false);
    chai.expect($state.go.called).to.eq(false);
    chai.expect($toast.show.called).to.eq(false);
  })
})
