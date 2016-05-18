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
      uploadingFiles: [],
    };
  }

  select(selectFiles) {
    const filterFiles = selectFiles.filter(selectFile =>
      this.state.files.every(file => file.name !== selectFile.name)
    );
    const files = this.state.files.concat(filterFiles);
    const size = totalSize(files);
    this.state = { ...this.state, files, size };
  }

  delete(name) {
    const files = this.state.files.filter(file => file.name !== name);
    const size = totalSize(files);

    this.state = { ...this.state, files, size };
  }

  isUploading() {
    return this.state.uploading;
  }

  abort() {
    this.state.uploadingFiles.forEach(file => file.abort());
    this.state.uploadingFiles = [];
  }

  upload() {
    const { bucket, folders } = this.$file.paths;
    const prefix = folders.length ? '' : `${folders.join('/')}/`;
    const url = `${this.Config.API_URL}/v1/file/create`;

    this.state.files.forEach(file =>
      this.uploadFile(url, { bucket, prefix, file })
    );

    this.closeDialog();
  }

  uploadFile(url, data) {
    const { name } = data.file;
    const upload = this.Upload.upload({ url, data });
    this.state.uploadingFiles.push(upload);
    this.state.uploading = true;

    upload.then(
      () => this.handleUploadSuccess(name),
      err => this.handleUploadFailure(name, err),
      evt => this.handleEvent(name, evt)
    );
  }

  handleEvent(name, evt) {
    console.log(evt);
  }

  handleUploadSuccess(name) {
    this.removeUploadingFile(name);
    this.$file.getFiles();
    this.$toast.show(`${name} is uploaded successfully!`);
  }

  handleUploadFailure(name, err) {
    this.removeUploadingFile(name);
    this.$toast.show(`${name} is uploaded failure! Error: ${err}`);
  }

  removeUploadingFile(name) {
    this.state.uploadingFiles.filter(uploadingFile =>
      uploadingFile.name !== name
    );

    if (! this.state.uploadingFiles.length) {
      this.state.uploading = false;
    }
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
    this.state.files = [];
    this.state.size = 0;
  }
}
