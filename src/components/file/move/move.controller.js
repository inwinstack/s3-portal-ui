export default class MoveController {
  /** @ngInject */
  constructor($file, $move, $scope) {
    Object.assign(this, {
      $file, $move, $scope,
    });

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, {
        fileSelected: newVal.data.filter(({ checked }) => checked),
      })
    , true);
    $scope.$watch(
      () => $move.state,
      newVal => Object.assign(this, newVal)
    , true);
  }

  cancel() {
    this.$move.closeDialog();
  }

  move() {
    this.$move.moveFile(this.fileSelected, this.newName)
      .then(() => (this.form.$submitted = false));
  }
}
