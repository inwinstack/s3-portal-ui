export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $manager) {
    Object.assign(this, {
      $manager,
    });

    $scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, {
        selectedOne: newVal.data.filter(({ checked }) => checked).length === 1,
      })
    , true);
  }

  createAccountDialog($event) {
    this.$manager.createAccountDialog($event);
  }

  refresh() {
    this.$manager.getAccounts();
  }

  delete() {
    this.$manager.deleteDialog();
  }

  reset() {
    this.$manager.resetDialog();
  }
}
