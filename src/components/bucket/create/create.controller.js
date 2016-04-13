export default class BucketCreateController {
  /** @ngInject */
  constructor($bucket, $scope) {
    Object.assign(this, {
      $bucket, $scope,
    });

    this.$scope.$watch(
      () => $bucket.state.create,
      newVal => Object.assign(this, newVal)
    , true);
  }

  check() {
    if (this.form.bucket.$valid) {
      this.$bucket.checkBucket(this.bucket);
    } else {
      this.$bucket.resetCheckBucketState();
    }
  }

  create() {
    this.$bucket.createBucket(this.bucket);
  }

  cancel() {
    this.$bucket.closeDialog();
  }
}
