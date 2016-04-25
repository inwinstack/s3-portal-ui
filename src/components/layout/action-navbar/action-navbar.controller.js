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
   * Returns the type is FILE or not.
   *
   * @return {Boolean}
   */
  isFile() {
    return this.type === 'FILE';
  }

  open() {
    //
  }

  download() {
    //
  }

  upload() {
    //
  }

  delete() {
    //
  }

  none() {
    //
  }

  properties() {
    //
  }

  transfers() {
    //
  }

  /**
   * Display the create dialog by `this.type`
   *
   * @param  {Object} $event
   * @return {Void}
   */
  create($event) {
    if (this.isFile()) {
      // create file dialog
    } else {
      this.$bucket.createDialog($event);
    }
  }

  /**
   * Refresh the list by `this.type`
   *
   * @return {Void}
   */
  refresh() {
    if (this.isFile()) {
      // get the files
    } else {
      this.$bucket.getBuckets();
    }
  }
}
