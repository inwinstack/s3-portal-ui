export default class FileController {
  /** @ngInject */
  constructor($scope, $stateParams, $file) {
    Object.assign(this, {
      $scope, $file,
    });

    this.$scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    this.$file.setPaths($stateParams.path);
    this.$file.getFiles();
  }
}
