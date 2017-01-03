export default class BreadcrumbController {
  /** @ngInject */
  constructor($scope, $bucket, $breadcrumb) {
    Object.assign(this, {
      $scope, $bucket, $breadcrumb,
    });

    this.$scope.$watch(
      () => $breadcrumb.paths,
      newVal => (this.paths = newVal)
    , true);
  }
}
