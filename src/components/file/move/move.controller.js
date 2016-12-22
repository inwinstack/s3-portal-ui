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

    // ------------------------------
    // these objects are used for mock data

    this.lists = {
      data: [],
    };

    for (let i = 0; i < 20; i++) {
      this.lists.data.push({
        Key: `Test/${i + 1}`,
        LastModified: '2016-12-21T06:43:19.911Z',
        Size: '0',
        display: `${i + 1}`,
        icon: 'folder',
        isFolder: true,
      });
    }
    // ------------------------------
  }

  cancel() {
    this.$move.closeDialog();
  }

  doubleClick({ isFolder, display }) {
    if (isFolder) {
      const currentPath = this.$file.getFullPaths();
      const path = `/bucket/${currentPath}${display}`;
      this.$location.path(path);
    }
  }

}
