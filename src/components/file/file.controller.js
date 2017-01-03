export default class FileController {
  /** @ngInject */
  constructor($scope, $location, $stateParams, $file, $bucket, $breadcrumb, $upload,
              $folder, $properties) {
    Object.assign(this, {
      $location, $file, $upload, $bucket, $breadcrumb, $folder, $properties,
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

  clickFile(file) {
    this.$properties.showProperties(this.$file.state.paths.bucket, file);
  }

  doubleClick({ isFolder, display }) {
    if (isFolder) {
      const currentPath = this.$file.getFullPaths();
      const path = `/bucket/${currentPath}${display}`;
      this.$location.path(path);
    }
  }

  selectFile(file) {
    this.$file.selectFile(file.Key);
  }

  upload($event) {
    this.$upload.createDialog($event);
  }

  refresh() {
    this.$file.getFiles();
  }
}
