import { element } from 'angular';
import RenameController from './rename.controller';
import RenameTemplate from './rename.html';

export default class RenameService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file, $toast, $translate) {
    Object.assign(this, {
      $mdDialog, $fetch, $file, $toast, $translate,
    });
    this.state = {
      duplicated: false,
    }
  }

  renameFile(oldFile, newFile) {
    const { bucket, prefix } = this.$file.state.paths;
    const fileName = oldFile[0].display;

    return this.$fetch.post('/v1/file/rename', {
      bucket, old: oldFile[0].Key, new: prefix + newFile,
    })
    .then(() => this.$translate("FILE.RENAME_SUCCESS", { fileName })
      .then(message => {
        this.$file.getFiles();
        this.$toast.show(message);
        this.closeDialog();
      }))
    .catch(() => this.$translate("FILE.RENAME_FAILURE", { fileName })
      .then(message => {
        this.state.duplicated = true;
        this.$toast.show(message);
      }));
  }

  createDialog($event) {
    this.$mdDialog.show({
      controller: RenameController,
      controllerAs: 'rename',
      template: RenameTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  closeDialog() {
    this.$mdDialog.cancel();
  }
}
