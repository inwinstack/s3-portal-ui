export default class BucketController {
  /** @ngInject */
  constructor($scope, $bucket, $state, $breadcrumb) {
    Object.assign(this, {
      $scope, $bucket, $state,
    });

    this.$scope.$watch(
      () => $bucket.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    $breadcrumb.initPaths();
    this.$bucket.getBuckets();
  }

  createBucket($event) {
    this.$bucket.createDialog($event);
  }

  selectBucket(bucket) {
    this.$state.go('file', { path: bucket });
  }
}
