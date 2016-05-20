export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $bucket, $nav, $file, $upload) {
    Object.assign(this, {
      $scope, $bucket, $file, $upload,
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
      this.$upload.createDialog($event);
    } else {
      this.$bucket.createDialog($event);
    }
  }

  createFolder($event) {
    // handle the create folder event
  }

  /**
   * Refresh the list by `this.type`
   *
   * @return {Void}
   */
  refresh() {
    if (this.isFile()) {
      this.$file.getFiles();
    } else {
      this.$bucket.getBuckets();
    }
  }
}
