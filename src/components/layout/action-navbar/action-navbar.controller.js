export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $bucket, $nav, $file, $upload, $layout) {
    Object.assign(this, {
      $scope, $bucket, $file, $upload, $layout,
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

  upload($event) {
    this.$upload.createDialog($event);
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

  toggleTransfer() {
    this.$layout.toggleTransfer();
  }

  /**
   * Display the create dialog by `this.type`
   *
   * @param  {Object} $event
   * @return {Void}
   */
  create($event) {
    if (this.isFile()) {
      //
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
      this.$file.getFiles();
    } else {
      this.$bucket.getBuckets();
    }
  }
}
