import BucketCreateController from './create.controller';
import bucketCreateTemplate from './create.html';

describe('BucketCreateController unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeTemplate;
  let $bucket;
  let $compile;
  let form;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$bucket_, _$compile_) => {
    $rootScope = _$rootScope_;
    $bucket = _$bucket_;
    $compile = _$compile_;

    makeTemplate = angular.element(bucketCreateTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.create.form;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new BucketCreateController($bucket, $rootScope);
    };
  }));

  describe('create bucket', function() {
    it('should submit create bucket request', function(done) {
      const controller = makeController();
      const bucketLists = makeDeferred();
      const BucketMock = sinon.mock($bucket);
      BucketMock.expects('createBucket').returns(bucketLists.promise);
      bucketLists.resolve();

      controller.form = { $submitted: true };

      controller.create();
      $rootScope.$digest();

      process.nextTick(() => {
        done();
        expect(controller.form.$submitted).to.eq(false);
      });
    });
  });
});
