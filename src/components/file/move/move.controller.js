export default class MoveController {
  /** @ngInject */
  constructor($file, $move, $scope, $stateParams) {
    Object.assign(this, {
      $file, $move, $scope,
    });

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, {
        fileSelected: newVal.data.filter(({ checked }) => checked),
      })
    , true);
    $scope.$watch(
      () => $move.state.lists,
      newVal => Object.assign(this, newVal)
    , true);
    this.paths = $stateParams.path.split('/');
    this.bucket = this.paths[0];
    this.paths = '';
    this.$move.getFiles(this.bucket);
  }

  cancel() {
    this.$move.closeDialog();
  }
  
  doubleClick({ isFolder, display }) {
    if (isFolder) {
      this.setPaths(display);
      this.$move.getFiles(this.bucket, this.paths);
    }
  }
  
  setPaths(paths) {
    this.paths = this.paths + `${paths}/`;
  }

  getFullPaths() {
    return this.paths.split('/');
  }

  move() {
    for (const file in this.fileSelected) {
      this.$move.moveFile(this.bucket, this.fileSelected[file].Key, this.bucket, this.paths, this.fileSelected[file].display)
        .then(() => (this.form.$submitted = false));
    }
  }
}
