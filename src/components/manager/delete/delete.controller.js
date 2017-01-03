export default class DeleteAccountController {
  /** @ngInject */
  constructor($scope, $manager) {
    Object.assign(this, {
      $scope, $manager,
    });

    this.$scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, {
        deleteAccount: newVal.data.filter(({ checked }) => checked),
      })
    , true);
  }

  cancel() {
    this.inputName = '';
    this.$manager.closeDeleteDialog();
  }

  check() {
    this.checkStatus = this.inputName !== this.deleteAccount[0].name;
  }

  accountDelete() {
    this.$manager.deleteAccount(this.deleteAccount[0]);
  }
}
