export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $manager) {
    Object.assign(this, {
      $manager,
    });
  }

  createAccountDialog($event) {
    this.$manager.createAccountDialog($event);
  }

  refresh() {
    this.$manager.getAccounts();
  }
}
