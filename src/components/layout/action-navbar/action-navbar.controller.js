export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $bucket, $nav) {
    Object.assign(this, {
      $scope, $bucket,
    });

    this.$scope.$watch(
      () => $nav.type,
      newVal => (this.type = newVal)
    );
  }

  /**
   * Display the create dialog by `this.type`
   *
   * @param  {object} $event
   * @return {void}
   */
  create($event) {
    if (this.type === 'Bucket') {
      this.$bucket.createDialog($event);
    } else {
      // create file dialog
    }
  }

  /**
   * Refresh the list by `this.type`
   *
   * @return {void}
   */
  refresh() {
    if (this.type === 'Bucket') {
      this.$bucket.getBuckets();
    } else {
      // get the files
    }
  }
}
