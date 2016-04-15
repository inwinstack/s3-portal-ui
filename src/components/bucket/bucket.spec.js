import bucketCtrl from './bucket.controller';
import createCtrl from './create/create.controller';
import bucketServ from './bucket.service';
import createTem from './create/create.html';
import app from './../../index.js';

describe('bucket testing', function() {
  let $rootScope;
  let makeService;
  let makeDeferred;
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

    $compile(createTem)($rootScope);

    $auth.isAuthenticated = () => true;

    $httpBackend = _$httpBackend_;

    makeService = () => {
        return new bucketServ($fetch, $toast, $mdDialog);
    };

    makeDeferred = () => {
      return $q.defer();
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
  describe('when resetCheckBucketState', function() {
    it('should let checking, checked and duplicated be false', function() {
        const service = makeService();
        service.getBuckets = () => {};
        service.resetCheckBucketState();
        $rootScope.$digest();
        expect(service.state.create.checking).to.eq(false);
        expect(service.state.create.checked).to.eq(false);
        expect(service.state.create.duplicated).to.eq(false);
    });
  });
  describe('when createDialog', function() {
    it('should invoke $mdDialog.show', function() {
        const service = makeService();
        service.getBuckets = () => {};
        const dialog = sinon.spy($mdDialog, 'show');
        service.createDialog();
        $rootScope.$digest();
        expect(dialog.called).to.eq(true);
    });
  });
  describe('when close Dialog', function() {
    it('should invoke $mdDialog.cancel', function() {
        const service = makeService();
        service.getBuckets = () => {};
        const dialog = sinon.spy($mdDialog, 'cancel')
        service.closeDialog();
        $rootScope.$digest();
        expect(dialog.called).to.eq(true);
    });
  });
  describe('when sortByName', function() {
    it('should sorted bucket name', function() {
      const service = makeService();
      const data = [{
                  Name:'abd11'
                },{
                  Name:'abd1'
                },{
                  Name:'ab'
                },{
                  Name:'abd'
                },{
                  Name:'abd12'
                }
              ];
      const sortData = data.sort(service.sortByName);
      expect(sortData[0].Name).to.eq('ab');
      expect(sortData[1].Name).to.eq('abd');
      expect(sortData[2].Name).to.eq('abd1');
      expect(sortData[3].Name).to.eq('abd11');
      expect(sortData[4].Name).to.eq('abd12');
    });     
  });
  describe('when checkBucket resolve', function() {
    it('should let duplicated to be false', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.duplicated).to.eq(false);
    });
    it('should let checking to be false', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.checked).to.eq(true);
    });
  });
  describe('when checkBucket reject', function() {
    it('should let duplicated to be true', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.duplicated).to.eq(true);
    });
    it('should let checking to be false', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      service.checkBucket();
      $rootScope.$digest();
      expect(service.state.create.checked).to.eq(true);
    });
  });
  describe('when createBucket resolve', function() {
    it('should invoke toast.show and called with bucket name created', function() {
      const res = { "Buckets": [{ Name:'abd12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data:res });
      const toast = sinon.spy($toast, 'show');
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Bucket abd12 has created!');
    });
    it('should invoke sorByName', function() {
      const res = { "Buckets": [{ Name:'abd' }, { Name:'ab12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data:res });
      const sort = sinon.spy(service, 'sortByName');
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(sort.called).to.eq(true);
    });
    it('should invoke closeDialog', function() {
      const res = { "Buckets": [{ Name:'abd12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data:res });
      const dialog = sinon.spy(service, 'closeDialog');
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
    it('should let checked to be false', function() {
      const res = { "Buckets": [{ Name:'abd12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data:res });
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(service.state.create.checked).to.eq(false);
    });
  });
  describe('when createBucket reject', function() {
    it('should invoke $toast.show and call with fail message', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      const toast = sinon.spy($toast, 'show');
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(toast).to.have.been.calledWith('Bucket create failure, please try again!');
    });
    it('should invoke closeDialog', function() {
      const res = { "Buckets": [{ Name:'abd12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      const dialog = sinon.spy(service, 'closeDialog');
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(dialog.called).to.eq(true);
    });
    it('should let checked to be false', function() {
      const res = { "Buckets": [{ Name:'abd12' }]};
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      service.createBucket('abd12');
      $rootScope.$digest();
      expect(service.state.create.checked).to.eq(false);
    });
  });
  describe('when createBucket in bucketCtrl', function() {
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
  describe('when fill valid bucket name', function() {
    it('should be valid', function() {
      $rootScope.$digest();
      const form = $rootScope.create.form;
      form.bucket.$setModelValue('5555');
      $rootScope.$digest();
      console.log(form.bucket);
    });
  });
  describe('when create() in bucketCtrl', function() {
    it('should invoke service.createBucket and call with bucket', function() {
      const service = makeService();
      service.createBucket = () => {};
      const controller = makeCreateController(service);
      controller.bucket = 'BucketName';
      const cBucket = sinon.spy(service, 'createBucket');
      controller.create();
      $rootScope.$digest();
      expect(cBucket).to.have.been.calledWith('BucketName');
    });
  });
  describe('when cancel() in bucketCtrl', function() {
    it('should invoke service.closeDialog', function() {
      const service = makeService();
      const controller = makeCreateController(service);
      const close = sinon.spy(service, 'closeDialog');
      controller.cancel();
      $rootScope.$digest();
      expect(close.called).to.eq(true);
    });
  })
});