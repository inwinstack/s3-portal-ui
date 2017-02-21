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

    this.selected = [];

    this.options = {
      rowSelection: false,
      multiSelect: false,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true
    };

    this.query = {
      order: 'name',
      limit: 10,
      page: 1
    };

    this.limitOptions = [5, 10, 15];
  }

 toggleLimitOptions = function () {
    this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
  };

  selectAccount(account) {
    this.$manager.selectAccount(account.id);
  }

  createQuotaSettingDiag($event) {
    this.$manager.createQuotaSettingDiag($event);
  }

  refresh() {
    this.$manager.getAccounts();
  }
}
