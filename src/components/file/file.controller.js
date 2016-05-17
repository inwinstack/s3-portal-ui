export default class FileController {
  /** @ngInject */
  constructor($scope, $stateParams, $file, $bucket, $breadcrumb) {
    Object.assign(this, {
      $scope, $file, $bucket, $breadcrumb,
    });

    this.$scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    const [bucket, ...folders] = $stateParams.path.split('/');

    this.$file.setPaths(bucket, folders);
    this.$breadcrumb.updateFilePath(folders);

    this.$bucket.getBuckets();
    this.$file.getFiles();
  }
}
