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

    const paths = $stateParams.path.split('/');
    const [bucket, ...folders] = paths;

    this.$file.setPaths(bucket, folders);
    this.$breadcrumb.updateFilePath(paths);

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
