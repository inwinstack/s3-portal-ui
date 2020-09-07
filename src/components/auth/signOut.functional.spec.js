import layoutModule from '../layout/layout';
import topNavbarCtrl from '../layout/top-navbar/top-navbar.controller';
import app from './../../index.js';

describe('User log out', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let $httpBackend;
  let AuthService;
  let $translate;
  let $mdDialog;
  let $toast;
  let $state;
  let $auth;
  
  beforeEach(angular.mock.module('app'));
 
  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _AuthService_, _$mdDialog_, _$httpBackend_, _$translate_) => {
    $rootScope = _$rootScope_;
  
    $toast = _$toast_;
  
    $state = _$state_;
  
    $auth = _$auth_;

    $auth.isAuthenticated = () => true;

    $auth.setToken('thisIsToken');

    AuthService = _AuthService_;

    $mdDialog = _$mdDialog_;

    $translate = _$translate_;

    $httpBackend = _$httpBackend_;

    makeDeferred = () => {
      return $q.defer();
    }

    makeController = () => {
      return new topNavbarCtrl($translate, $auth, $state, $toast, $mdDialog, AuthService);
    };
  }));
  describe('when logout success', function() {
    it('should invoke $auth.logout', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(200);

      const auth = sinon.spy($auth, 'logout');
      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(auth.called).to.eq(true);
    });
    it('should invoke $state.go and called with auth.signin', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(200);

      const state = sinon.spy($state, 'go');
      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(state).to.have.been.calledWith('auth.signin');
    });
    it('should invoke $toast.show and called with Sign Out Success!', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(200);

      const toast = sinon.spy($toast, 'show');
      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign Out Success!');
    });
    it('should clear token', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      expect($auth.getToken()).to.eq('thisIsToken');
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(200);

      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect($auth.getToken()).to.eq(null);
    });
  });
  describe('when confirm logout and logout fail', function() {
    it('should invoke $toast.show and called with Sign Out Failure!', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(401);
      
      const toast = sinon.spy($toast, 'show');
      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Sign Out Failure!');
    });
    it('should not clear token', function() {
      const controller = makeController();
      const signOutMock = sinon.mock(controller.$mdDialog);
      const signOutDeferred = makeDeferred();
      signOutMock.expects('show').returns(signOutDeferred.promise);
      signOutDeferred.resolve();
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/logout').respond(401);
      
      controller.signOut();
      $httpBackend.flush();
      $rootScope.$digest();
      expect($auth.getToken()).to.eq('thisIsToken');
    })
  });
});



