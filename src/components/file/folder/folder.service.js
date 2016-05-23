import { element } from 'angular';
import FolderCreateController from './folder.controller';
import FolderCreateTemplate from './folder.html';

export default class FolderCreateService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file) {
    Object.assign(this, {
      $mdDialog, $fetch, $file,
    });
  }

  initState() {
    this.state = {
      duplicated: false,
    };
  }

  createFolder(folder) {
    const { bucket } = this.$file.state.paths;
    const prefix = `${folder}/`;

    this.$fetch.post('/v1/file/create', {
      bucket, prefix,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
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
