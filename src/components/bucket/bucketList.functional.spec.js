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
  describe('when requesting and waiting response', function() {
    it('should let controller.requesting to be true', function() {
      const service = makeService();
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond();
      $rootScope.$digest();
      expect(controller.requesting).to.eq(true);
    });
  });
  describe('when get response but no bucket', function() {
    it('should let data.length to be empty and requesting and error to be false', function() {
      const service = makeService();
      const controller = makeController(service);
      const data = { "Buckets": [] };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.data.length).to.be.empty;
      expect(controller.requesting).to.eq(false);
      expect(controller.error).to.eq(false);
    });
  });
  describe('when get response and there are buckets', function() {
    it('should have been sort', function() {
      const service = makeService();
      const controller = makeController(service);
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
                    }
                  ] 
                };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.data[0].Name).to.eq('ab');
      expect(controller.data[1].Name).to.eq('abc');
      expect(controller.data[2].Name).to.eq('abd');
      expect(controller.data[3].Name).to.eq('abd1');
      expect(controller.data[4].Name).to.eq('abd2');
      expect(controller.data[5].Name).to.eq('abd11');
      expect(controller.data[6].Name).to.eq('abd22');
    });
    it('should let data.length not to be empty', function() {
      const service = makeService();
      const controller = makeController(service);
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
                    }
                  ] };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.data.length).not.to.empty;
    });
    it('should let controller.requesting to be false', function() {
      const service = makeService();
      const controller = makeController(service);
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
                    }
                  ] };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.requesting).to.eq(false);
    });
    it('should let controller.error to be false', function() {
      const service = makeService();
      const controller = makeController(service);
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
                    }
                  ] };
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(200, data);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.error).to.eq(false);
    });
  });
  describe('when get bad response', function() {
    it('should let controller.error to be true and requesting to be false', function() {
      const service = makeService();
      const controller = makeController(service);
      $httpBackend.expectPOST($fetch.API_URL + '/v1/bucket/list').respond(429);
      $rootScope.$digest();
      $httpBackend.flush();
      expect(controller.error).to.eq(true);
      expect(controller.requesting).to.eq(false);
    });
  });
});



