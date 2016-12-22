import { element } from 'angular';
import MoveController from './move.controller';
import MoveTemplate from './move.html';

export default class RenameService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file, $toast, $translate) {
    Object.assign(this, {
      $mdDialog, $fetch, $file, $toast, $translate,
    });
    this.state = {
      duplicated: false,
    };
  }

  createDialog($event) {
    this.$mdDialog.show({
      controller: MoveController,
      controllerAs: 'move',
      template: MoveTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      onRemoving: () => {
        this.state.duplicated = false;
      }
    });
  }

  closeDialog() {
    this.$mdDialog.cancel();
  }
}
