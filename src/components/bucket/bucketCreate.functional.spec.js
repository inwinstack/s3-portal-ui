import bucketCtrl from './bucket.controller';
import createCtrl from './create/create.controller';
import bucketServ from './bucket.service';
import createTem from './create/create.html';
import app from './../../index.js';

describe('create bucket', function() {
  let $rootScope;
  let makeService;
  let makeController;
  let makeCreateController;
  let $httpBackend;
  let $auth;
  let $compile;
  let $toast;
  let $mdDialog;
  let $fetch;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$compile_, _$rootScope_, _$auth_, _$toast_, _$mdDialog_, _$state_, _$fetch_, _$httpBackend_) => {
      $rootScope = _$rootScope_;

      $compile = _$compile_;

      $fetch = _$fetch_;

      $toast = _$toast_;

      $mdDialog = _$mdDialog_;

      $auth = _$auth_;

      $compile(createTem)($rootScope);

      $auth.isAuthenticated = () => true;

      $httpBackend = _$httpBackend_;

      makeService = () => {
          return new bucketServ($fetch, $toast, $mdDialog);
      }

      makeController = (service) => {
          return new bucketCtrl($rootScope, service);
      };

      makeCreateController = (service) => {
          return new createCtrl(service, $rootScope);
      }
  }));
  describe('when open createDialog', function() {
    it('should invoke $mdDialog.show', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const controller = makeController(service);
      const dialog = sinon.spy($mdDialog, 'show');
      controller.createBucket();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
  });
  describe('when close createDialog', function() {
    it('should invoke $mdDialog.cancel', function() {
      const service = makeService();
      const controller = makeCreateController(service);
      const dialog = sinon.spy($mdDialog, 'cancel');
      controller.cancel();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
  });
  describe('when fill exist bucket name', function() {
    it('should let duplicated to be true', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(401, 'Has Bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.duplicated).to.eq(true);
    });
    it('should let checking to be false', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(401, 'Has Bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(401, 'Has Bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.checked).to.eq(true);
    });
  });
  describe('when fill non-exist bucket name', function() {
    it('should let duplicated to be false', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(200, 'You can use the bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.duplicated).to.eq(false);
    });
    it('should let checking to be false', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(200, 'You can use the bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      const service = makeService();
      const postData = { bucket:'abc' };
      const controller = makeCreateController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check', postData).respond(200, 'You can use the bucket');
      service.checkBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.checked).to.eq(true);
    });
  });
  describe('when create bucket success', function() {
    it('should get sorter bucket list', function() {
      const postData = { bucket:'abd' };
      const res = { "Buckets": [
                          {
                            Name:'abc',
                            CreationDate: '2016-04-08T14:46:28.000z'
                          },
                          {
                            Name:'abd22',
                            CreationDate: '2016-04-08T14:45:28.000z'
                          },
                          {
                            Name:'abd2',
                            CreationDate: '2016-04-08T14:36:28.000z'
                          },
                          {
                            Name:'abd11',
                            CreationDate: '2016-04-08T14:16:28.000z'
                          },
                          {
                            Name:'abd1',
                            CreationDate: '2016-04-08T14:28:28.000z'
                          },
                          {
                            Name:'ab',
                            CreationDate: '2016-04-08T14:08:28.000z'
                          },
                          {
                            Name:'abd12',
                            CreationDate: '201604-08T15:35:16.000z'
                          },
                          {
                            Name:'abd',
                            CreationDate: '2016-04-08T14:15:28.000z'
                          }
                        ] };
      const service = makeService()
      service.getBuckets = () => {};
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(200, res);
      service.createBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(controller.data[0].Name).to.eq('ab');
      expect(controller.data[1].Name).to.eq('abc');
      expect(controller.data[2].Name).to.eq('abd');
      expect(controller.data[3].Name).to.eq('abd1');
      expect(controller.data[4].Name).to.eq('abd2');
      expect(controller.data[5].Name).to.eq('abd11');
      expect(controller.data[6].Name).to.eq('abd12');
      expect(controller.data[7].Name).to.eq('abd22');
    });
    it('should invoke $toast.show and call with success message', function() {
      const postData = { bucket:'abd' };
      const res = { "Buckets": [
                          {
                            Name:'abc',
                            CreationDate: '2016-04-08T14:46:28.000z'
                          },
                          {
                            Name:'abd22',
                            CreationDate: '2016-04-08T14:45:28.000z'
                          },
                        ] };
      const service = makeService()
      service.getBuckets = () => {};
      const controller = makeController(service);
      const toast = sinon.spy($toast, 'show');
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(200, res);
      service.createBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Bucket ' + postData.bucket + ' has created!');
    });
    it('sould invoke closeDialog', function() {
      const postData = { bucket:'abd' };
      const res = { "Buckets": [
                          {
                            Name:'abc',
                            CreationDate: '2016-04-08T14:46:28.000z'
                          },
                          {
                            Name:'abd22',
                            CreationDate: '2016-04-08T14:45:28.000z'
                          },
                        ] };
      const service = makeService()
      service.getBuckets = () => {};
      const controller = makeController(service);
      const dialog = sinon.spy(service, 'closeDialog');
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(200, res);
      service.createBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
  });
  describe('when create bucket fail', function() {
    it('should invoke $toast.show and called with fail message', function() {
      const postData = { bucket:'abd' };
      const service = makeService()
      service.getBuckets = () => {};
      const controller = makeController(service);
      const toast = sinon.spy($toast, 'show');
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(401, 'Create Bucket Error');
      service.createBucket(postData.bucket);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Bucket create failure, please try again!');
    })
  });
});