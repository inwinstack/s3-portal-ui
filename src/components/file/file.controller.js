export default class FileController {
  /** @ngInject */
  constructor($scope, $location, $stateParams, $file, $bucket, $breadcrumb, $upload, $folder) {
    Object.assign(this, {
      $location, $file, $upload, $bucket, $breadcrumb, $folder,
    });

    $scope.$watch(
      () => $file.state.lists,
      newVal => Object.assign(this, newVal)
    , true);

    const paths = $stateParams.path.split('/');
    const [bucket, ...folders] = paths;
    const prefix = (folders.length) ? `${folders.join('/')}/` : '';

    this.level = (prefix === '') ? 'BUCKET' : 'FOLDER';

    this.$file.setPaths(bucket, prefix);
    this.$breadcrumb.updateFilePath(paths);

    this.$bucket.getBuckets();
    this.$file.getFiles();
  }

  createFolder($event) {
    this.$folder.createDialog($event);
  }

  clickFile({ isFolder, display }) {
    if (isFolder) {
      const currentPath = this.$file.getFullPaths();
      const path = `/bucket/${currentPath}${display}`;
      this.$location.path(path);
    }
  }

  selectFile(name) {
    this.$file.selectFile(name);
  }

  upload($event) {
    this.$upload.createDialog($event);
  }

  refresh() {
    this.$file.getFiles();
  }
}
