export default class RenameController {
  /** @ngInject */
  constructor($file, $rename, $scope) {
    Object.assign(this, {
      $file, $rename, $scope,
    });
  }

  cancel() {
    this.$rename.closeDialog();
  }
}
