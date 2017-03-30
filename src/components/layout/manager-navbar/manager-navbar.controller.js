export default class ActionNavbarController {
  /** @ngInject */
  constructor($scope, $manager, $managerNav) {
    Object.assign(this, {
      $manager, $managerNav, $scope
    });

    $scope.$watch(
      () => $manager.state.lists,
      newVal => Object.assign(this, {
        selectedOne: newVal.data.filter(({ checked }) => checked).length === 1,
      })
    , true);

    $scope.$watch(
      () => this.searchText,
      newVal => $managerNav.searchText = this.searchText
    , true);

    this.searchText = '';
    this.showSearchBarInput = false;
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

  showSearchBar() {
    this.searchText = '';
    this.showSearchBarInput = !this.showSearchBarInput;
  }
}
