export default class FolderCreateController {
  /** @ngInject */
  constructor($folder, $translate) {
    this.$folder = $folder;
    $translate('FILE.NEW_FOLDER')
      .then(newFolder => (this.folder = newFolder));
  }

  create() {
    this.$folder.createFolder(this.folder);
  }

  cancel() {
    this.$folder.closeDialog();
  }
}
