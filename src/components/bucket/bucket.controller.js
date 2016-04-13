export default class BucketController {
  /** @ngInject */
  constructor($scope, $bucket) {
    Object.assign(this, {
      $scope, $bucket,
    });

    this.$scope.$watch(
      () => $bucket.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    this.$bucket.getBuckets();
  }

  createBucket($event) {
    this.$bucket.createDialog($event);
  }
}
