export default class FolderCreateController {
  /** @ngInject */
  constructor($folder) {
    this.$folder = $folder;
  }

  create() {
    this.$folder.createFolder(this.folder);
  }

  cancel() {
    this.$folder.closeDialog();
  }
}
