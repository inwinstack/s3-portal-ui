import signInModule from './signin';
import signInCtrl from './signin.controller';
import signInTemplate from './signin.html';
import app from '../../../index.js';

describe('SignIn unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeTemplate;
  let $httpBackend
  let $compile;
  let $toast;
  let $state;
  let $auth;
  let form;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _$compile_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $httpBackend = _$httpBackend_;

    $compile = _$compile_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    makeTemplate = angular.element(signInTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.signin.form;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signInCtrl($auth, $state, $toast);
    };
  }));
  describe('when fill invalid email', function() {
    it('should be invalid', function() {
      form.email.$setViewValue('eeeiii');
      $rootScope.$digest(); 
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('eeeiii');
      expect(form.$invalid).to.eq(true);
                                                                   
      form.email.$setViewValue('');                                
      $rootScope.$digest();                                        
      expect(form.email.$valid).to.eq(false);                      
      expect(form.email.$viewValue).to.eq('');                     
      expect(form.$invalid).to.eq(true);                           
                                                                   
      form.email.$setViewValue('chaoeninwinstack.com');            
      $rootScope.$digest();                                        
      expect(form.email.$valid).to.eq(false);                      
      expect(form.email.$viewValue).to.eq('chaoeninwinstack.com'); 
      expect(form.$invalid).to.eq(true);                     
    });
  });
  describe('when fill valid email', function() {
    it('should be valid', function() {
      form.email.$setViewValue('chaoen.l@inwinstack.com');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(true);
      expect(form.email.$viewValue).to.eq('chaoen.l@inwinstack.com');
      expect(form.$invalid).to.eq(true);
    });
  });
  describe('when fill invalid password', function() {
    it('should be invalid', function() {
      form.password.$setViewValue('');
      $rootScope.$digest();
      expect(form.password.$valid).to.eq(false);
      expect(form.password.$viewValue).to.eq('');
      expect(form.$invalid).to.eq(true);
    });
  });
  describe('when fill valid password', function() {
    it('should be valid', function() {
      form.password.$setViewValue('abc123');
      $rootScope.$digest();
      expect(form.password.$valid).to.eq(true);
      expect(form.password.$viewValue).to.eq('abc123');
      expect(form.$invalid).to.eq(true);
    });
  });
  describe('when signin success', function() {
    it('should invoke $state.go called with dashboard', function() {
      const AuthMock = sinon.mock($auth);
      const authDeferred = makeDeferred();
      AuthMock.expects('login').returns(authDeferred.promise);
      authDeferred.resolve();

      const controller = makeController();

      const state = sinon.spy($state, 'go');
    
      controller.submit();
      $rootScope.$digest();

      chai.expect(state).to.have.been.calledWith('dashboard');
    });
    it ('should invoke $toast.show called with Sign In Success!', function() {
      const AuthMock = sinon.mock($auth);
      const authDeferred = makeDeferred();
      AuthMock.expects('login').returns(authDeferred.promise);
      authDeferred.resolve();

      const controller = makeController();

      const toast = sinon.spy($toast, 'show');

      controller.submit();
      $rootScope.$digest();
      
      chai.expect(toast).to.have.been.calledWith('Sign In Success!');
    });
  });
  describe('when signin fail', function() {
    it('should let controller.incorrect be true and form.$submitted be false', function() {
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
    });
  });
});
