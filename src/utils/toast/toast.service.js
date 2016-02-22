export default class ToastService {
  /** @ngInject */
  constructor($mdToast) {
    Object.assign(this, {
      $mdToast
    });
  }

  show(content) {
    return this.$mdToast.show(
      this.$mdToast.simple()
      .content(content)
      .action('OK')
      .hideDelay(2000)
    );
  }

  hide() {
    this.$mdToast.hide();
  }
}
