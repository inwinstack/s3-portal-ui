export default class BucketDeleteController {
  /** @ngInject */
  constructor($scope, $bucket) {
    Object.assign(this, {
      $bucket,
    });

    $scope.$watch(() => $bucket.state.delete.name, newVal => this.deleteName = newVal);
  }

  check() {
    this.checkStatus = this.inputName !== this.deleteName;
  }

  deleteBucket() {
    this.$bucket.deleteBucket();
  }

  cancel() {
    this.$bucket.closeDialog();
  }
}