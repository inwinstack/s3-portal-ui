export default class TransferController {
  /** @ngInject */
  constructor($scope, $layout, $transfer) {
    Object.assign(this, {
      $layout, $transfer,
    });

    $scope.$watch(
      () => $transfer.state,
      newVal => Object.assign(this, newVal)
    , true);
  }

  toggleAutoClear() {
    this.$transfer.toggleAutoClear();
  }

  close() {
    this.$layout.closeSidePanels();
  }

  md2line(t) {
    const status = ['FAILED', 'DELETED', 'PAUSED', 'COMPLETED', 'DELETING'];
    return status.indexOf(t.status) >= 0;
  }

  md3line(t) {
    const status = ['UPLOADING', 'RESUMING'];
    return status.indexOf(t.status) >= 0;
  }

  isUpload(t) {
    return t.type === 'UPLOAD';
  }

  isDelete(t) {
    return t.type === 'DELETE';
  }

  isDeleting(t) {
    return t.status === 'DELETING';
  }

  isUploading(t) {
    return t.status === 'UPLOADING';
  }

  isCompleted(t) {
    const status = ['COMPLETED', 'DELETED'];
    return status.indexOf(t.status) >= 0;
  }

  showInfo(t) {
    const status = ['FAILED', 'PAUSED'];
    return status.indexOf(t.status) < 0;
  }
}
