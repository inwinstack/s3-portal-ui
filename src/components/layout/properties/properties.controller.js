export default class PropertiesController {
  /** @ngInject */
  constructor($scope, $layout, $transfer, $properties) {
    Object.assign(this, {
      $layout, $transfer,
    });

    $scope.$watch(
      () => $properties.state.file,
      newVal => this.state = newVal
    , true);
  }

  close() {
    this.$layout.closeSidePanels();
  }
}
