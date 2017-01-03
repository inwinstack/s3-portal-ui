export default class LayoutController {
  /** @ngInject */
  constructor($layout, AuthService) {
    Object.assign(this, {
      $layout, AuthService,
    });
  }

  toggleTransfer() {
    this.$layout.toggleTransfer();
  }
}
