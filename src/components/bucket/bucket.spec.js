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
  let $breadcrumb;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$compile_, _$rootScope_, _$auth_, _$toast_, _$mdDialog_, _$breadcrumb_, _$state_, _$fetch_, _$httpBackend_) => {
    $rootScope = _$rootScope_;

    $compile = _$compile_;

    $fetch = _$fetch_;

    $toast = _$toast_;

    $mdDialog = _$mdDialog_;

    $auth = _$auth_;

    $breadcrumb = _$breadcrumb_;

    $compile(createTem)($rootScope);

    form = $rootScope.create.form;

    form.bucket.$options.debounce = 0;

    $auth.isAuthenticated = () => true;

    $httpBackend = _$httpBackend_;

    makeService = () => {
        return new bucketServ($fetch, $toast, $mdDialog, $breadcrumb);
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
    it('should declare delete.name', () => {
      const service = makeService();
      $rootScope.$digest();
      expect(service.state.delete.name).to.be.null;
    });
  });
  describe('when resetCheckBucketState in service', function() {
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
        const dialog = sinon.spy($mdDialog, 'show');
        service.createDialog();
        $rootScope.$digest();
        expect(dialog.called).to.eq(true);
    });
  });
  // describe('when deleteDialog in service', () => {
  //   it('should invoke $mdDialog.show', () => {
  //     const service = makeService();
  //     const mockDialog = sinon.spy($mdDialog, 'show');
  //     service.deleteDialog();
  //     $rootScope.$digest();
  //     expect(mockDialog.called).to.eq(true);
  //   });
  // });
  describe('when close Dialog', function() {
    it('should invoke $mdDialog.cancel', function() {
        const service = makeService();
        const dialog = sinon.spy($mdDialog, 'cancel')
        service.closeDialog();
        $rootScope.$digest();
        expect(dialog.called).to.eq(true);
    });
  });
  describe('when selectBucket in service', () => {
    let service;
    beforeEach(() => {
      service = makeService();
      service.state.lists.data = [
        {id:'a', Name:'aName'}, { id:'B', Name:'bName'}, 
        {id:'c', Name:'cName'}
      ];
      service.selectBucket('cName')
    });
    it('should checked which bucket name called', () => {
      expect(service.state.lists.data[2].checked).to.eq(true);
      expect(service.state.lists.data[1].checked).to.eq(false);
      expect(service.state.lists.data[0].checked).to.eq(false);
    });
  });
  describe('when deleteBucket in service and success', () => {
    let service;
    let deferred;
    let mockFetch;
    let mockToast;
    let mockGetBucket;
    let mockClose;
    let message;
    beforeEach(() => {
      service = makeService();
      service.state.lists.data = [
        {id:'a', Name:'aName'}, { id:'B', Name:'bName'}, 
        {id:'c', Name:'cName'}
      ];
      service.state.delete.name = 'aName';
      service.getBuckets = () => {};
      deferred = makeDeferred();
      mockFetch = sinon.mock($fetch);
      mockFetch.expects('delete').returns(deferred.promise);
      deferred.resolve();
      mockToast = sinon.spy($toast, 'show');
      mockGetBucket = sinon.spy(service, 'getBuckets');
      mockClose = sinon.spy(service, 'closeDialog');
      message = 'Bucket aName has been deleted!';
      service.deleteBucket();
      $rootScope.$digest();
    });
    it('should let state.delete.name to be null', () => {
      expect(service.state.delete.name).to.be.null;
    });
    it('should invoke $toast.show and call by message', () => {
      expect(mockToast).to.have.been.calledWith(message);
    });
    it('should invoke getBuckets', () => {
      expect(mockGetBucket.called).to.eq(true);
    });
    it('should invoke closeDialog', () => {
      expect(mockClose.called).to.eq(true);
    });
  });
  describe('when deleteBucket in service and fail', () => {
    let service;
    let mockToast;
    let mockFetch;
    let deferred;
    let mockClose;
    let message;
    beforeEach(() => {
      service = makeService();
      service.state.lists.data = [
        {id:'a', Name:'aName'}, { id:'B', Name:'bName'}, 
        {id:'c', Name:'cName'}
      ];
      service.state.delete.name = 'aName';
      deferred = makeDeferred();
      mockFetch = sinon.mock($fetch);
      mockToast = sinon.spy($toast, 'show');
      mockClose = sinon.spy(service, 'closeDialog');
      mockFetch.expects('delete').returns(deferred.promise);
      deferred.reject();
      service.deleteBucket();
      message = 'Bucket aName delete failed, please try again!';
      $rootScope.$digest();
    });
    it('should invoke toast.show and call by fail message', () => {
      expect(mockToast).to.have.been.calledWith(message);
    });
    it('should invoke updateBucketPath', () => {
      expect(mockClose.called).to.eq(true);
    });
  });
  describe('when getBuckets in service and success', () => {
    let service;
    let deferred;
    let mockUpdate;
    let mockFetch;
    let res;
    beforeEach(() => {
      res = {Buckets:
        [{ Name: 'b' }, { Name: 'c' }, { Name: 'a'},
        { Name: 'a1'}]
      };
      deferred = makeDeferred();
      service = makeService();
      mockFetch = sinon.mock($fetch);
      mockUpdate = sinon.spy($breadcrumb, 'updateBucketPath');
      mockFetch.expects('post').returns(deferred.promise);
      deferred.resolve({data: res});
      service.getBuckets();
      $rootScope.$digest();
    });
    it('should invoke updateBucketPath and call by length', () => {
      expect(mockUpdate).to.have.been.calledWith(res.Buckets.length);
    });
    it('should get sorted data', () => {
      expect(service.state.lists.data[0].Name).to.eq('a');
      expect(service.state.lists.data[1].Name).to.eq('a1');
      expect(service.state.lists.data[2].Name).to.eq('b');
      expect(service.state.lists.data[3].Name).to.eq('c');
    });
    it('should let requesting to be false', () => {
      expect(service.state.lists.requesting).to.eq(false);
    });
  });
  describe('when getBuckets in service and fail', () => {
    let service;
    let deferred;
    let mockFetch;
    let mockUpdate;
    beforeEach(() => {
      service = makeService();
      deferred = makeDeferred()
      mockFetch = sinon.mock($fetch);
      mockFetch.expects('post').returns(deferred.promise);
      mockUpdate = sinon.spy($breadcrumb, 'updateBucketPath')
      deferred.reject();
      service.getBuckets();
      $rootScope.$digest();
    });
    it('should invoke updateBucketPath and call by length', () => {
      expect(mockUpdate).to.have.been.calledWith(0);
    });
    it('should let requesting to be false', () => {
      expect(service.state.lists.requesting).to.eq(false);
    });
    it('should let error to be true', () => {
      expect(service.state.lists.error).to.eq(true);
    });
  });
  describe('when checkBucket in service and success', function() {
    let service;
    let deferred;
    let mockFetch;
    beforeEach(() => {
      service = makeService();
      deferred =makeDeferred();
      mockFetch = sinon.mock($fetch)
      mockFetch.expects('post').returns(deferred.promise);
      deferred.resolve();
      service.checkBucket('BucketName');
      $rootScope.$digest();
    });
    it('should let duplicated to be false', function() {
      expect(service.state.create.duplicated).to.eq(false);
    });
    it('should let checking to be false', function() {
      expect(service.state.create.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      expect(service.state.create.checked).to.eq(true);
    });
  });
  describe('when checkBucket in service and fail', function() {
    let service;
    let deferred;
    let mockFetch;
    beforeEach(() => {
      service = makeService();
      deferred =makeDeferred();
      mockFetch = sinon.mock($fetch)
      mockFetch.expects('post').returns(deferred.promise);
      deferred.reject();
      service.checkBucket('BucketName');
      $rootScope.$digest();
    });
    it('should let duplicated to be true', function() {
      expect(service.state.create.duplicated).to.eq(true);
    });
    it('should let checking to be false', function() {
      expect(service.state.create.checking).to.eq(false);
    });
    it('should let checked to be true', function() {
      expect(service.state.create.checked).to.eq(true);
    });
  });
  describe('when createBucket in service and success', function() {
    let service;
    let deferred;
    let mockFetch;
    let mockToast;
    let res;
    let message;
    let mockClose;
    beforeEach(() => {
      res = {Buckets:
        [{ Name: 'b' }, { Name: 'c' }, { Name: 'a'},
        { Name: 'a1'}, {Name: 'BucketName'}]
      };
      message = 'Bucket BucketName has created!';
      service = makeService();
      mockClose = sinon.spy(service, 'closeDialog');
      mockToast = sinon.spy($toast, 'show');
      deferred =makeDeferred();
      mockFetch = sinon.mock($fetch)
      mockFetch.expects('post').returns(deferred.promise);
      deferred.resolve({data: res});
      service.createBucket('BucketName');
      $rootScope.$digest();
    });
    it('should invoke toast.show and called with success message', function() {
      expect(mockToast).to.have.been.calledWith(message);
    });
    it('should get sorted bucket', function() {
      expect(service.state.lists.data[0].Name).to.eq('BucketName');
      expect(service.state.lists.data[1].Name).to.eq('a');
      expect(service.state.lists.data[2].Name).to.eq('a1');
      expect(service.state.lists.data[3].Name).to.eq('b');
      expect(service.state.lists.data[4].Name).to.eq('c');
    });
    it('should invoke closeDialog', function() {
      expect(mockClose.called).to.eq(true);
    });
  });
  describe('when createBucket reject', function() {
    let service;
    let deferred;
    let mockFetch;
    let mockToast;
    let res;
    let message;
    let mockClose;
    beforeEach(() => {
      res = {Buckets:
        [{ Name: 'b' }, { Name: 'c' }, { Name: 'a'},
        { Name: 'a1'}, {Name: 'BucketName'}]
      };
      message = 'Bucket create failure, please try again!';
      service = makeService();
      mockClose = sinon.spy(service, 'closeDialog');
      mockToast = sinon.spy($toast, 'show');
      deferred =makeDeferred();
      mockFetch = sinon.mock($fetch)
      mockFetch.expects('post').returns(deferred.promise);
      deferred.reject();
      service.createBucket('BucketName');
      $rootScope.$digest();
    });
    it('should invoke $toast.show and call with fail message', function() {
      expect(mockToast).to.have.been.calledWith(message);
    });
    it('should invoke closeDialog', function() {
      expect(mockClose.called).to.eq(true);
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
      form.bucket.$setViewValue('BucketName');
      $rootScope.$digest();
      expect(form.bucket.$viewValue).to.eq('BucketName');
      expect(form.bucket.$valid).to.eq(true);
      expect(form.bucket.$invalid).to.eq(false);
    });
  });
  describe('when fill a non-valid email', function() {
    it('should be invalid', function() {
      form.bucket.$setViewValue('');
      $rootScope.$digest();
      expect(form.bucket.$viewValue).to.eq('');
      expect(form.bucket.$valid).to.eq(false);
      expect(form.bucket.$invalid).to.eq(true);
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