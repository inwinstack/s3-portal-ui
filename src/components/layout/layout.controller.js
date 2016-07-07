export default class LayoutController {
  /** @ngInject */
  constructor($layout) {
    Object.assign(this, {
      $layout,
    });
  }

  toggleTransfer() {
    this.$layout.toggleTransfer();
  }
}
