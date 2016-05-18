export default class FileController {
  /** @ngInject */
  constructor($scope, $stateParams, $file, $bucket, $breadcrumb, $upload) {
    Object.assign(this, {
      $file, $upload, $bucket, $breadcrumb,
    });

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    const [bucket, ...folders] = $stateParams.path.split('/');

    this.$file.setPaths(bucket, folders);
    this.$breadcrumb.updateFilePath(folders);

    this.$bucket.getBuckets();
    this.$file.getFiles();
  }

  createFolder($event) {
    this.$file.createFolder($event);
  }

  upload($event) {
    this.$upload.createDialog($event);
  }

  refresh() {
    this.$file.getFiles();
  }
}
