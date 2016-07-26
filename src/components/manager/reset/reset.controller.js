export default class DeleteAccountController {
  /** @ngInject */
  constructor($scope, $manager) {
    Object.assign(this, {
      $scope, $manager,
    });

    this.$scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, {
        resetAccount: newVal.data.filter(({ checked }) => checked),
      })
    , true);
  }

  cancel() {
    this.$manager.closeResetDialog();
  }

  submit() {
    this.$manager.resetPassword(this.resetAccount[0].name, this.password);
  }
}
