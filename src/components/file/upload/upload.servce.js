import { element } from 'angular';
import totalSize from '../../../utils/totalSize';
import FileUploadController from './upload.controller';
import FileUploadTemplate from './upload.html';

export default class FileUploadService {
  /** @ngInject */
  constructor(Config, Upload, $mdDialog, $file, $toast) {
    Object.assign(this, {
      Config, Upload, $mdDialog, $file, $toast,
    });

    this.initState();
  }

  initState() {
    this.state = {
      files: [],
      size: 0,
      uploading: false,
    };
  }

  select(selectedFiles) {
    const additionalFiles = selectedFiles.filter(selectedFile =>
      this.state.files.every(({ detail, status }) =>
        (detail.name === selectedFile.name && status !== 'PENDING') ||
        (detail.name !== selectedFile.name && status === 'PENDING')
      )
    ).map(detail => ({
      id: Symbol('unique id'),
      status: 'PENDING',
      detail,
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

  isUploading() {
    return this.state.uploading;
  }

  abort() {
    this.state.files.forEach(file => file.upload.abort());
    this.state.files = [];
  }

  findFileIndex(id) {
    return this.state.files.findIndex(file => file.id === id);
  }

  upload() {
    const { bucket, folders } = this.$file.paths;
    const prefix = folders.length ? '' : `${folders.join('/')}/`;
    const url = `${this.Config.API_URL}/v1/file/create`;

    this.state = {
      uploading: true,
      files: this.state.files.map(file => ({
        ...file,
        status: 'UPLOADING',
        upload: this.uploadFile(file.id, {
          bucket, prefix, file: file.detail,
        }, url),
      })),
    };

    this.closeDialog();
  }

  uploadFile(id, data, url) {
    const upload = this.Upload.upload({ url, data });

    upload.then(
      res => this.handleSuccess(id, res),
      err => this.handleFailure(id, err),
      evt => this.handleEvent(id, evt)
    );

    return upload;
  }

  handleEvent(id, evt) {
    const i = this.findFileIndex(id);
    this.state.files[i].process = evt;
    console.log(this.state.files[i].process);
    console.log(this.state);
  }

  handleSuccess(id, res) {
    const i = this.findFileIndex(id);
    this.state.files[i].status = 'UPLOADED';
    this.updateUpdateStatus();
    this.$file.getFiles();
    console.log(res);
  }

  handleFailure(id, err) {
    const i = this.findFileIndex(id);
    this.state.files[i].status = 'FAILURE';
    this.updateUpdateStatus();
    console.log(err);
  }

  removeUploadFile(id) {
    const i = this.findFileIndex(id);
    delete this.state.files[i];
  }

  updateUpdateStatus() {
    this.state.uploading = this.state.files.every(
      file => file.status === 'UPLOADING'
    );
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
  }
}
