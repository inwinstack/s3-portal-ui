import signUpModule from './signup';
import signUpCtrl from './signup.controller';
import signUpTemplate from './signup.html'
import app from '../../../index.js';

describe('SignUp unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeTemplate;
  let $httpBackend
  let $toast;
  let $state;
  let $auth;
  let $compile;
  let form;
  let AuthService;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$toast_, _$state_, _$auth_, _AuthService_, _$compile_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $toast = _$toast_;

    $state = _$state_;

    $auth = _$auth_;

    $compile = _$compile_;

    $httpBackend = _$httpBackend_;

    AuthService = _AuthService_;

    makeTemplate = angular.element(signUpTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.signup.form;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new signUpCtrl($auth, $state, $toast, AuthService);
    };
  }));
  describe('when fill a email in invalid format', function() {
    it('should be invalid', function() {
      form.email.$setViewValue('eeeiii');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('eeeiii');

      form.email.$setViewValue('');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('');

      form.email.$setViewValue('chaoeninwinstack.com');
      $rootScope.$digest();
      expect(form.email.$valid).to.eq(false);
      expect(form.email.$viewValue).to.eq('chaoeninwinstack.com');
    });
  });
  describe('when fill a non-exist valid email', function() {                                            
    it('should be valid', function() {                                                                  
      form.email.$setViewValue('chaoen@inwinstack.com');                                                
      $rootScope.$digest();                                                                             
      expect(form.email.$valid).to.eq(true);                                                            
      expect(form.email.$viewValue).to.eq('chaoen@inwinstack.com');                                     
    });                                                                                                 
    it('should invoke ckeckEmail() in signup.controller and emailIsValid should be true', function() {  
      const controller = makeController();                                                              
      form.email.$setViewValue('chaoen@inwinstack.com');                                                
      const data = { email: form.email.$setViewValue };                                                 
      controller.form = { email: { '$valid': form.email.$valid }};                                      
      controller.credentials = data;                                                                    
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(200);   
      controller.checkEmail();                                                                          
      $httpBackend.flush();                                                                             
      $rootScope.$digest();                                                                             
      expect(controller.emailIsValid).to.eq(true);                                                      
    });                                                                                                 
  });                                                                                                   
  describe('when fill a exist email', function() {                                                      
    it('should be valid', function() {                                                                  
      form.email.$setViewValue('chaoen.l@inwinstack.com');                                              
      $rootScope.$digest();                                                                             
      expect(form.email.$valid).to.eq(true);                                                            
      expect(form.email.$viewValue).to.eq('chaoen.l@inwinstack.com');                                   
      expect(form.$invalid).to.eq(true);                                                                
    });                                                                                                 
    it('should invoke ckeckEmail() in signup.controller and emailIsValid should be false', function() { 
      const controller = makeController();                                                              
      form.email.$setViewValue('chaoen.l@inwinstack.com');                                              
      const data = { email: form.email.$setViewValue };                                                 
      controller.form = { email: { '$valid': form.email.$valid }};                                      
      controller.credentials = data;                                                                    
      $httpBackend.expectPOST('http://163.17.136.83:8080/api/v1/auth/checkEmail', data).respond(403);   
      controller.checkEmail();                                                                          
      $httpBackend.flush();                                                                             
      $rootScope.$digest();                                                                             
      expect(controller.emailIsValid).to.eq(false);                                                     
    });                                                                                                 
  });
  describe('when fill different text in password and password_confirmation', function() {
      it('should be invalid', function() {
        form.password.$setViewValue('abc1234');
        form.password_confirmation.$setViewValue('1234567');
        $rootScope.$digest();
        expect(form.password_confirmation.$valid).to.eq(false);
        expect(form.password_confirmation.$viewValue).to.eq('1234567');
        expect(form.password.$viewValue).to.eq('abc1234');
      });
    });
    describe('when fill same text in password and password_confirmation', function() {
      it('should be valid', function() {
        form.password.$setViewValue('abc1234');
        form.password_confirmation.$setViewValue('abc1234');
        $rootScope.$digest();
        expect(form.password_confirmation.$valid).to.eq(true);
        expect(form.password_confirmation.$viewValue).to.eq('abc1234');
        expect(form.password.$viewValue).to.eq('abc1234');
        expect(form.password.$valid).to.eq(true);
      });
    });                                                                                                  
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
