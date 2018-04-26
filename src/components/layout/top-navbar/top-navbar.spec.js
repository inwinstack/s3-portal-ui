import layoutModule from '../layout';
import topNavbarCtrl from './top-navbar.controller';
import app from '../../../index.js';

describe('User log out', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let AuthService;
  let $translate;
  let $mdDialog;
  let $toast;
  let $state;
  let $auth;
  
  beforeEach(angular.mock.module('app'));
 
  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _AuthService_, _$mdDialog_, _$translate_) => {
    $rootScope = _$rootScope_;
  
    $toast = _$toast_;
  
    $state = _$state_;
  
    $auth = _$auth_;

    $auth.isAuthenticated = () => true;

    AuthService = _AuthService_;

    $mdDialog = _$mdDialog_;

    $translate = _$translate_;

    makeDeferred = () => {
      return $q.defer();
    }

    makeController = () => {
      return new topNavbarCtrl($translate, $auth, $state, $toast, $mdDialog, AuthService);
    };
  }));
  describe('when logout', function() {
    it('should invoke showConfirmMessage()', function() {
      const controller = makeController();
      const showDialog = sinon.spy(controller, 'showConfirmMessage');
      controller.signOut();
      expect(showDialog.called).to.eq(true);
    });
  });
  describe('when showConfirmMessage', function() {
    it('should invoke $mdDialog.confirm', function() {
      const controller = makeController();
      const dialog = sinon.spy($mdDialog, 'confirm');
      controller.signOut();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
  });
  describe('when executedSignOut resolve', function() {
    it('should invoke $auth.logout', function() {
      const controller = makeController();
      const AuthMock = sinon.mock(AuthService);
      const deferred = makeDeferred();
      AuthMock.expects('signOut').returns(deferred.promise);
      deferred.resolve();
      const auth = sinon.spy($auth, 'logout');
      controller.executedSignOut();
      $rootScope.$digest();
      expect(auth.called).to.eq(true);
    });
    it('should invoke $state.go and called with auth.signin', function() {
      const controller = makeController();
      const AuthMock = sinon.mock(AuthService);
      const deferred = makeDeferred();
      AuthMock.expects('signOut').returns(deferred.promise);
      deferred.resolve();
      const state = sinon.spy($state, 'go');
      controller.executedSignOut();
      $rootScope.$digest();
      expect(state).to.have.been.calledWith('auth.signin');
    });
    it('should invoke $toast.show and called with success message', function() {
      const controller = makeController();
      const AuthMock = sinon.mock(AuthService);
      const deferred = makeDeferred();
      AuthMock.expects('signOut').returns(deferred.promise);
      deferred.resolve();
      const toast = sinon.spy($toast, 'show');
      controller.executedSignOut();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign Out Success!');
    });
  });
  describe('when executedSignOut reject', function() {
    it('should invoke $toast.show and call with fail message', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const deferred = makeDeferred();
      const authMock = sinon.mock(AuthService);
      const authDeferred = makeDeferred();
      signOutMock.expects('show').returns(deferred.promise);
      deferred.reject();
      authMock.expects('signOut').returns(authDeferred.promise);
      authDeferred.reject();

      const toast = sinon.spy($toast, 'show');
      controller.executedSignOut();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign Out Failure!');
    });
  });
});



