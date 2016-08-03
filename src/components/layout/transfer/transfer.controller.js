export default class TransferController {
  /** @ngInject */
  constructor($scope, $layout, $transfer, $translate, $mdDialog) {
    Object.assign(this, {
      $layout, $transfer, $translate, $mdDialog,
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

  abortConfirm($event, transfering) {
    const sources = [
      'TRANSFER.TITLE.CANCEL',
      'TRANSFER.CANCEL_DESCRIPTION',
      'TRANSFER.CANCEL_ARIA_LABEL',
      'UTILS.CONFIRM',
      'UTILS.CANCEL',
    ];

    this.$translate(sources)
      .then(translations => this.$mdDialog.confirm()
        .title(translations[sources[0]])
        .textContent(translations[sources[1]])
        .ariaLabel(translations[sources[2]])
        .targetEvent($event)
        .ok(translations[sources[3]])
        .cancel(translations[sources[4]]))
      .then(confirm => this.$mdDialog.show(confirm)
        .then(() => this.$transfer.abortUploading(transfering))
      );
  }
}
