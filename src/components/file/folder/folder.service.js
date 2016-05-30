import { element } from 'angular';
import FolderCreateController from './folder.controller';
import FolderCreateTemplate from './folder.html';

export default class FolderCreateService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file, $toast) {
    Object.assign(this, {
      $mdDialog, $fetch, $file, $toast,
    });

    this.initState();
  }

  initState() {
    this.state = {
      duplicated: false,
    };
  }

  createFolder(folder) {
    const { bucket, prefix } = this.$file.state.paths;
    const finalPrefix = `${prefix}${folder}/`;

    return this.$fetch.post('/v1/folder/create', {
      bucket, prefix: finalPrefix,
    })
    .then(() => {
      this.$file.getFiles();
      this.$toast.show(`Bucket ${folder} has created!`);
      this.closeDialog();
    })
    .catch(() => (this.state.duplicated = true));
  }

  createDialog($event) {
    this.$mdDialog.show({
      controller: FolderCreateController,
      controllerAs: 'create',
      template: FolderCreateTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  closeDialog() {
    this.$mdDialog.cancel();
    this.initState();
  }
}
