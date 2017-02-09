import bucketModule from './bucket';
import BucketCtrl from './bucket.controller';
import bucketTemplate from './bucket.html';

describe('Bucket unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeTemplate;
  let $bucket;
  let $state;
  let $breadcrumb;
  let $compile;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$bucket_, _$state_, _$breadcrumb_, _$compile_) => {
    $rootScope = _$rootScope_;
    $bucket = _$bucket_;
    $state = _$state_;
    $breadcrumb = _$breadcrumb_;
    $compile = _$compile_;

    makeTemplate = angular.element(bucketTemplate);

    $compile(makeTemplate)($rootScope);

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new BucketCtrl($rootScope, $bucket, $state, $breadcrumb);
    };
  }));

  beforeEach(function() {
    const bucketLists = makeDeferred();
    const BucketMock = sinon.mock($bucket);
    BucketMock.expects('getBuckets').returns(bucketLists.promise);
    bucketLists.resolve({
      $$hashKey: 'object:272',
      CreationDate: '2016-12-29T06:40:39.840Z',
      Name: 'testS3',
      checked: false,
    });
  });

  describe('when create bucket', function() {
    it('should call create bucket dialog', function() {
      const controller = makeController();
      const BucketMock = sinon.mock($bucket);
      controller.createBucket({ type: 'click' });
      $rootScope.$digest();

      BucketMock.expects('createDialog').once();
    });
  });

  describe('when click bucket', function() {
    it('should call clickBucket', function(done) {
      const controller = makeController();
      controller.clickBucket('tests3');
      $rootScope.$digest();

      const state = sinon.spy($state, 'go');

      process.nextTick(() => {
        done();
        expect(state).to.have.been.calledWith('file');
      });
    });
  });
});
