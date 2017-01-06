export default class ManagerListController {
  /** @ngInject */
  constructor($scope, $manager,) {
    Object.assign(this, {
      $scope, $manager,
    });

    this.$scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    this.$manager.getAccounts();
  }

  selectBucket(name) {
    this.$bucket.selectBucket(name);
  }

  selectAccount(account) {
    this.$manager.selectAccount(account.id);
  }

  createQuotaSettingDiag($event) {
    this.$manager.createQuotaSettingDiag($event);
  }
}
