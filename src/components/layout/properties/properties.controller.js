export default class PropertiesController {
  /** @ngInject */
  constructor($scope, $layout, $transfer, $properties) {
    Object.assign(this, {
      $layout, $transfer,
    });

    this.state = { Size : '123'};

    $scope.$watch(
      () => $properties.state.file,
      newVal => this.state = newVal
    , true);
  }

  close() {
    this.$layout.closeSidePanels();
  }
}
