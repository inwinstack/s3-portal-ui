import bucketCtrl from './bucket.controller';
import createCtrl from './create/create.controller';
import bucketServ from './bucket.service';
import createTem from './create/create.html';
import app from './../../index.js';

describe('bucket list', function() {
  let $rootScope;
  let makeService;
  let makeTem;
  let makeController;
  let makeCreateController;
  let $httpBackend;
  let $auth;
  let $compile;
  let $toast;
  let $mdDialog;
  let $fetch;
  let form;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$compile_, _$rootScope_, _$auth_, _$toast_, _$mdDialog_, _$state_, _$fetch_, _$httpBackend_) => {
      $rootScope = _$rootScope_;

      $compile = _$compile_;

      $fetch = _$fetch_;

      $toast = _$toast_;

      $mdDialog = _$mdDialog_;

      $auth = _$auth_;

      makeTem = angular.element(createTem);

      $compile(makeTem)($rootScope);

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
  describe('when init service', function() {
      it('should let state.lists.requesting to be false', function() {
          const service = makeService();
          $rootScope.$digest();
          expect(service.state.lists.requesting).to.eq(false);
      });
      it('should let state.lists.error to be false', function() {
          const service = makeService();
          $rootScope.$digest();
          expect(service.state.lists.error).to.eq(false);
      });
  });
  describe('when init controller', function() {
      it('should invoke getBuckets in service', function() {
          const service = makeService();
          const getB = sinon.spy(service, 'getBuckets');
          const controller = makeController(service);
          const data = {
              Buckets: [{
                  Name: 'BucketName',
                  CreationDate: '2016-04-08T14:46:28.000Z'
              }]
          };
          $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
          $httpBackend.flush();
          $rootScope.$digest();
          expect(getB.called).to.eq(true);
      });
      it('should invoke sortByName in service', function() {
          const service = makeService();
          const sortFunction = sinon.spy(service, 'sortByName');
          const controller = makeController(service);
          const data = {
              Buckets: [{
                  Name: 'BucketName',
                  CreationDate: '2016-04-08T14:46:28.000Z'
              }, {
                  Name: 'BucketName1',
                  CreationDate: '2016-04-08T14:36:16.000Z'
              }]
          };
          $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
          $httpBackend.flush();
          $rootScope.$digest();
          expect(sortFunction.called).to.eq(true);
      });
      it('should let state.lists.data save what backend response', function() {
          const service = makeService();
          expect(service.state.lists.data).to.be.empty;
          const controller = makeController(service);
          const data = {
              Buckets: [{
                  Name: 'BucketName',
                  CreationDate: '2016-04-08T14:46:28.000Z'
              }, {
                  Name: 'BucketName1',
                  CreationDate: '2016-04-08T14:36:16.000Z'
              }]
          };
          $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
          $httpBackend.flush();
          $rootScope.$digest();
          expect(service.state.lists.data).not.to.empty;
      });
  });
  describe('when open create Dialog', function() {
    it('should invoke service.createDialog', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const controller = makeController(service);
      const dialog = sinon.spy(service, 'createDialog');
      controller.createBucket();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
  });
  describe('when close Dialog', function() {
    it('should invoke $mdDialog.cancel', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const dialog = sinon.spy(service, 'closeDialog')
      createController.cancel();
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    })
  });
  describe('when checking exist bucket name', function() {
    it('should let create.duplicated to be true', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check').respond(401, 'Has Bucket');
      service.checkBucket('BucketName');
      $httpBackend.flush();
      $rootScope.$digest();
      expect(createController.duplicated).to.eq(true);
    });
    it('should let create.checked to be true', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check').respond(401, 'Has Bucket');
      service.checkBucket('BucketName');
      $httpBackend.flush();
      $rootScope.$digest();
      expect(createController.checked).to.eq(true);
    });
  });
  describe('when checking non-exist bucket name', function() {
    it('should let create.duplicated to be false', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check').respond(200, 'You can use the bucket');
      service.checkBucket('BucketName');
      $httpBackend.flush();
      $rootScope.$digest();
      expect(createController.duplicated).to.eq(false);
    });
    it('should let create.checked to be true', function() {
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/check').respond(200, 'You can use the bucket');
      service.checkBucket('BucketName');
      $httpBackend.flush();
      $rootScope.$digest();
      expect(createController.checked).to.eq(true);
    });
  });
  describe('when createBucket Success', function() {
    it('should invoke toast.show and called with bucket name created', function() {
      const data = { "Buckets": [
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
                      Name:'abd',
                      CreationDate: '2016-04-08T14:15:28.000z'
                    },
                    {
                      Name:'abd12',
                      CreationDate: '201604-08T15:35:16.000z'
                    }
                  ] };
      const postData = { bucket: 'abd12' };
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(200, data);
      const toast = sinon.spy($toast, 'show');
      createController.bucket = 'abd12';
      createController.create();
      $httpBackend.flush();
      expect(toast).to.have.been.calledWith('Bucket ' + postData.bucket + ' has created!');
    });
    it('should let controller.data get sorted data', function() {
      const data = { "Buckets": [
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
                      Name:'abd',
                      CreationDate: '2016-04-08T14:15:28.000z'
                    },
                    {
                      Name:'abd12',
                      CreationDate: '201604-08T15:35:16.000z'
                    }
                  ] };
      const postData = { bucket: 'abd12' };
      const service = makeService();
      service.getBuckets = () => {};
      const createController = makeCreateController(service);
      const controller = makeController(service);
      createController.bucket = 'abd12';
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/create', postData).respond(200, data);
      createController.create();
      $httpBackend.flush();
      expect(controller.data[0].Name).to.eq('ab');
      expect(controller.data[1].Name).to.eq('abc');
      expect(controller.data[2].Name).to.eq('abd');
      expect(controller.data[3].Name).to.eq('abd1');
      expect(controller.data[4].Name).to.eq('abd2');
      expect(controller.data[5].Name).to.eq('abd11');
      expect(controller.data[6].Name).to.eq('abd12');
      expect(controller.data[7].Name).to.eq('abd22');
    });
  });
});