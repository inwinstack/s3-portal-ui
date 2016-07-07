import { element } from 'angular';
import RenameController from './rename.controller';
import RenameTemplate from './rename.html';

export default class RenameService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file, $toast, $translate) {
    Object.assign(this, {
      $mdDialog, $fetch, $file, $toast, $translate,
    });
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
