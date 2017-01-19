import bucketCtrl from './bucket.controller';
import bucketServ from './bucket.service';
import app from './../../index.js';

describe('bucket testing', function() {
  let $rootScope;
  let makeService;
  let makeDeferred;
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

    makeDeferred = () => {
        return $q.defer();
    }

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
    it('should invoke getBuckets', function() {
        const service = makeService();
        service.getBuckets = () => {};
        const getB = sinon.spy(service, 'getBuckets');
        const controller = makeController(service);
        $rootScope.$digest();
        expect(getB.called).to.eq(true);
    });
  });
  describe('when getBuckets resolve', function() {
    it('should let error to be false', function() {
      const data = {
          Buckets: []
      };
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data });
      service.getBuckets();
      $rootScope.$digest();
      expect(service.state.lists.error).to.eq(false);
    });
    it('should invoke sortByName', function() {
      const data = {
          "Buckets": [{
              Name: 'abc',
              CreationDate: '2016-04-08T14:46:28.000z'
          }, {
              Name: 'abd22',
              CreationDate: '2016-04-08T14:45:28.000z'
          }]
      };
      const service = makeService();
      service.sortByName = () => {};
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.resolve({ data });
      const sorted = sinon.spy(service, 'sortByName');
      service.getBuckets();
      $rootScope.$digest();
      expect(sorted.called).to.eq(true);
    });
  });
  describe('when getBuckets reject', function() {
    it('should let error to be true', function() {
      const service = makeService();
      const deferred = makeDeferred();
      const fetchMock = sinon.mock(service.$fetch);
      fetchMock.expects('post').returns(deferred.promise);
      deferred.reject();
      service.getBuckets();
      $rootScope.$digest();
      expect(service.state.lists.error).to.eq(true);
    });
  });
  describe('when sortByName', function() {
    it('should get sorted data', function() {
      const service = makeService();
      const data = {
          "Buckets": [{
              Name: 'abc',
              CreationDate: '2016-04-08T14:46:28.000z'
          }, {
              Name: 'abd22',
              CreationDate: '2016-04-08T14:45:28.000z'
          }, {
              Name: 'abd2',
              CreationDate: '2016-04-08T14:36:28.000z'
          }, {
              Name: 'abd11',
              CreationDate: '2016-04-08T14:16:28.000z'
          }, {
              Name: 'abd1',
              CreationDate: '2016-04-08T14:28:28.000z'
          }, {
              Name: 'ab',
              CreationDate: '2016-04-08T14:08:28.000z'
          }, {
              Name: 'abd',
              CreationDate: '2016-04-08T14:15:28.000z'
          }]
      };
      const sorted = data.Buckets.sort(service.sortByName);
      $rootScope.$digest();
      expect(sorted[0].Name).to.eq('ab');
      expect(sorted[1].Name).to.eq('abc');
      expect(sorted[2].Name).to.eq('abd');
      expect(sorted[3].Name).to.eq('abd1');
      expect(sorted[4].Name).to.eq('abd2');
      expect(sorted[5].Name).to.eq('abd11');
      expect(sorted[6].Name).to.eq('abd22');
    });
  });
});
