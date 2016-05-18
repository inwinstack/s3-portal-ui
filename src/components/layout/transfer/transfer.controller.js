export default class TransferController {
  /** @ngInject */
  constructor($layout) {
    Object.assign(this, {
      $layout,
    });
  }

  close() {
    this.$layout.toggleTransfer();
  }
}
