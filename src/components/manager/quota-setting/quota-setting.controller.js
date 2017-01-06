export default class QuotaSettingController {
  /** @ngInject */
  constructor($scope, $mdDialog, $manager) {
    Object.assign(this, {
      $scope, $mdDialog, $manager,
    });

    this.$scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    // ------------------------------
    // these are used for mock data
    this.quota = 5000000000;
    this.quotaSize = 5;
    // ------------------------------
  }

  cancel() {
    this.$manager.closeDeleteDialog();
  }
}
