export default class FileUploadController {
  /** @ngInject */
  constructor($file, $upload, $scope) {
    Object.assign(this, {
      $file, $upload, $scope,
    });

    $scope.$watch(
      () => $upload.state,
      newVal => Object.assign(this, {
        ...newVal,
        files: newVal.files.filter(file => file.status === 'PENDING'),
      })
    , true);
  }

  upload() {
    this.$upload.upload();
  }

  select(files) {
    this.$upload.select(files);
  }

  delete(name) {
    this.$upload.delete(name);
  }

  cancel() {
    this.$upload.closeDialog();
  }
}
