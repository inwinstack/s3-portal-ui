export default class RenameController {
  /** @ngInject */
  constructor($file, $rename, $scope) {
    Object.assign(this, {
      $file, $rename, $scope,
    });

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, {
        fileSelected: newVal.data.filter(({ checked }) => checked),
      })
    , true);
    $scope.$watch(
      () => $rename.state,
      newVal => Object.assign(this, newVal)
    , true);
  }

  cancel() {
    this.$rename.closeDialog();
  }

  rename() {
    this.$rename.renameFile(this.fileSelected, this.newName)
      .then(() => (this.form.$submitted = false));
  }
}
