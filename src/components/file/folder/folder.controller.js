export default class FolderCreateController {
  /** @ngInject */
  constructor($scope, $folder, $translate) {
    this.$folder = $folder;
    $translate('FILE.NEW_FOLDER').then(newFolder => (this.folder = newFolder));

    $scope.$watch(() => $folder.state, newVal => Object.assign(this, newVal), true);
  }

  create() {
    this.$folder.createFolder(this.folder)
      .then(() => (this.form.$submitted = false));
  }

  cancel() {
    this.$folder.closeDialog();
  }
}
