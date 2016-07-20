export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $manager) {
    Object.assign(this, {
      $manager,
    });
  }



  refresh() {
    this.$manager.getAccounts();
  }
}
