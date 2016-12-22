export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $bucket, $nav, $file, $upload, $layout, $folder, $rename, $move) {
    Object.assign(this, {
      $bucket, $file, $upload, $layout, $folder, $rename, $move
    });

    $scope.$watch(
      () => $nav.type,
      newVal => (this.type = newVal)
    );

    $scope.$watch(
      () => $layout.state,
      newVal => Object.assign(this, newVal)
    );

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, {
        fileSelected: !! newVal.data.filter(({ checked }) => checked).length,
        fileSelectedOne: newVal.data.filter(({ checked }) => checked).length == 1,
        folderSelected: this.judgeFolder(newVal.data.filter(({ checked }) => checked)),
        downloadButton: ! newVal.downloadName,
      })
    , true);

    $scope.$watch(
      () => $bucket.state.delete.name,
      newVal => (this.bucketSelected = !! newVal)
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

  judgeFolder(files) {
    return !(files.filter(({ isFolder }) => isFolder).length);
  }

  open() {
    //
  }

  download() {
    this.$file.download();
  }

  delete() {
    if (this.isFile()) {
      this.$file.deleteDialog();
    } else {
      this.$bucket.deleteDialog();
    }
  }

  rename($event) {
    this.$rename.createDialog($event);
  }

  move($event) {
    this.$move.createDialog($event);
  }

  closeSidePanels() {
    this.$layout.closeSidePanels();
  }

  openProperties() {
    this.$layout.openProperties();
  }

  openTransfers() {
    this.$layout.openTransfers();
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
    this.$folder.createDialog($event);
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
