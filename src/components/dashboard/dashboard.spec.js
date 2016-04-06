import dashBoardModule from './dashboard';
import dashBoardCtrl from './dashboard.controller';
import app from './../../index.js';

describe('User log out', function() {
  let $rootScope;
  let makeController;
  let $toast;
  let $state;
  let $auth;
  
  beforeEach(angular.mock.module('app'));
 
  beforeEach(inject((_$rootScope_, _$toast_, _$state_, _$auth_) => {
    $rootScope = _$rootScope_;
  
    $toast = _$toast_;
  
    $state = _$state_;
  
    $auth = _$auth_;

    makeController = () => {
      return new dashBoardCtrl($auth, $state, $toast);
    };
  }));
  describe('when logout', function() {
    it('should invoke $auth.logout', function() {
      const controller = makeController();
      const auth = sinon.spy($auth, 'logout');
      controller.logout();
      $rootScope.$digest();
      expect(auth.called).to.eq(true);
    });
    it('should invoke $state.go called with auth.signin', function() {
      const controller = makeController();
      const state = sinon.spy($state, 'go');
      controller.logout();
      $rootScope.$digest();
      chai.expect(state).to.have.been.calledWith('auth.signin');
    });
    it('should invoke $toast.show called with Logout Success!', function() {
      const controller = makeController();
      const toast = sinon.spy($toast, 'show');
      controller.logout();
      $rootScope.$digest();
      chai.expect(toast).to.have.been.calledWith('Logout Success!');
    })
  });
});



