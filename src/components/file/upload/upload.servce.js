import { element } from 'angular';
import totalSize from '../../../utils/totalSize';
import FileUploadController from './upload.controller';
import FileUploadTemplate from './upload.html';

export default class FileUploadService {
  /** @ngInject */
  constructor(Config, Upload, $mdDialog, $file, $transfer) {
    Object.assign(this, {
      Config, Upload, $mdDialog, $file, $transfer,
    });

    this.initState();
  }

  initState() {
    this.state = {
      files: [],
      size: 0,
    };
  }

  select(selectedFiles) {
    const additionalFiles = selectedFiles.filter(selectedFile =>
      this.state.files.every(({ detail }) => detail.name !== selectedFile.name)
    ).map(detail => ({
      id: Symbol('unique id'), detail,
    }));

    const files = [...this.state.files, ...additionalFiles];

    const size = totalSize(files);
    this.state = { ...this.state, files, size };
  }

  delete(id) {
    const files = this.state.files.filter(file => file.id !== id);
    const size = totalSize(files);

    this.state = { ...this.state, files, size };
  }

  upload() {
    const { bucket, prefix } = this.$file.state.paths;
    const url = `${this.Config.API_URL}/v1/file/create`;

    this.state.uploading = true;
    this.$transfer.put(this.state.files.map(({
      id, detail,
    }) => ({
      id,
      bucket,
      name: detail.name,
      type: 'UPLOAD',
      status: 'UPLOADING',
      upload: this.uploadFile(id, {
        bucket, prefix, file: detail,
      }, url),
    })));

    this.closeDialog();
  }

  uploadFile(id, data, url) {
    const upload = this.Upload.upload({ url, data });

    upload.then(
      res => this.$transfer.handleSuccess(id, res),
      err => this.$transfer.handleFailure(id, err),
      evt => this.$transfer.handleEvent(id, evt)
    );

    return upload;
  }

  createDialog($event) {
    this.$mdDialog.show({
      controller: FileUploadController,
      controllerAs: 'upload',
      template: FileUploadTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  closeDialog() {
    this.$mdDialog.cancel();
    this.state.size = 0;
    this.state.files = [];
  }
}
