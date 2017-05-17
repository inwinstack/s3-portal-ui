export default class SideNavController {
  /** @ngInject */
  constructor($scope, AuthService) {
    Object.assign(this, {
      $scope, AuthService
    });
  }
}