import bucketCtrl from './bucket.controller';
import bucketServ from './bucket.service';
import app from './../../index.js';

describe('bucket list', function() {
  let $rootScope;
  let makeService;
  let makeController;
  let $httpBackend;
  let $auth;
  let $toast;
  let $mdDialog;
  let $fetch;
  
  beforeEach(angular.mock.module('app'));
 
  beforeEach(inject(($q, _$rootScope_, _$auth_, _$toast_, _$mdDialog_, _$state_, _$fetch_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $fetch = _$fetch_;

    $toast = _$toast_;

    $mdDialog = _$mdDialog_;

    $auth = _$auth_;

    $auth.isAuthenticated = () => true;

    $httpBackend = _$httpBackend_;

    makeService = () => {
      return new bucketServ($fetch, $toast, $mdDialog);
    }

    makeController = (service) => {
      return new bucketCtrl($rootScope, service);
    };
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
      const data = { Buckets: [
                      {
                        Name: 'BucketName',
                        CreationDate: '2016-04-08T14:46:28.000Z'
                      }
                  ] };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(getB.called).to.eq(true);
    });
    it('should invoke sortByName in servcie', function() {
      const service = makeService();
      const sortFunction = sinon.spy(service, 'sortByName');
      const controller = makeController(service);
      const data = { 
                    Buckets: 
                      [
                        {
                          Name: 'BucketName',
                          CreationDate: '2016-04-08T14:46:28.000Z'
                        },
                        {
                          Name: 'BucketName1',
                          CreationDate: '2016-04-08T14:36:16.000Z'
                        }
                      ]
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
                    Buckets: 
                      [
                        {
                          Name: 'BucketName',
                          CreationDate: '2016-04-08T14:46:28.000Z'
                        },
                        {
                          Name: 'BucketName1',
                          CreationDate: '2016-04-08T14:36:16.000Z'
                        }
                      ]
                    };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(service.state.lists.data).not.to.empty;
    });
  });
});



