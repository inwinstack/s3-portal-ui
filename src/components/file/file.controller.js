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
    const prefix = (folders.length) ? `${folders.join('/')}/` : '';

    this.$file.setPaths(bucket, prefix);
    this.$breadcrumb.updateFilePath(paths);

    this.$bucket.getBuckets();
    this.$file.getFiles();
  }

  createFolder($event) {
    this.$file.createFolder($event);
  }

  selectFile(etag) {
    this.$file.selectFile(etag);
  }

  upload($event) {
    this.$upload.createDialog($event);
  }

  refresh() {
    this.$file.getFiles();
  }
}
