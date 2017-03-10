import { element } from 'angular';
import MoveController from './move.controller';
import MoveTemplate from './move.html';
import { sortFiles } from '../../../utils/sort';

export default class MoveService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $file, $toast, $translate) {
    Object.assign(this, {
      $mdDialog, $fetch, $file, $toast, $translate,
    });
    this.state = {
      paths:{
        bucket:'',
        prefix:'',
      },
      lists: {
        requesting:'',
        data:'',
      }
    }
  }

  createDialog($event) {
    this.$mdDialog.show({
      controller: MoveController,
      controllerAs: 'move',
      template: MoveTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  getFiles(bucket, prefix = '') {
    const endpoint = `/v1/file/list/${bucket}?prefix=${prefix}`;
    const selected = this.$file.state.lists.data.filter(({ checked }) => checked).map(file => { return file.Key });

    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch
      .get(endpoint)
      .then(({ data }) => {
        this.state.lists.error = false;
        this.state.lists.data = sortFiles(this.formatFilesData(data.files, prefix, selected));
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });
  }

  formatFileType(name, prefix) {
    const isFolder = name.endsWith('/');
    const removeSlash = isFolder ? name.slice(0, -1) : name;
    const display = removeSlash.replace(prefix, '');
    return { isFolder, display };
  }

  formatFilesData(files, prefix, selected) {
    const baseLen = prefix.split('/').length;

    return (! files) ? [] :
      files.filter(({ Key }) => {
        const { length } = Key.split('/');
        return (
          length === baseLen
          || length === baseLen + 1
          && Key.endsWith('/')
        ) && Key !== prefix && selected.indexOf(Key) == -1;
      }).map(file => ({
        ...file,
        ...this.formatFileType(file.Key, prefix),
        icon: this.$file.getIcon(file.Key),
        checked: false,
      }));
  }

  closeDialog() {
    this.$mdDialog.cancel();
  }

  moveFile(sourceBucket, sourceFile, goalBucket, goalFile, fileName) {
    return this.$fetch.post('/v1/file/move', {
      sourceBucket: sourceBucket, sourceFile: sourceFile, goalBucket, goalBucket, goalFile: goalFile + fileName
    })
    .then(() => this.$translate("FILE.MOVE_SUCCESS", { fileName })
      .then(message => {
        this.$file.getFiles();
        this.$toast.show(message);
        this.closeDialog();
      }))
    .catch(() => this.$translate("FILE.MOVE_FAILURE", { fileName })
      .then(message => {
        this.$toast.show(message);
        this.closeDialog();
      }));
  }

  moveFolder(sourceBucket, sourceFolder, goalBucket, goalFolder, folderName) {
    return this.$fetch.post('/v1/folder/move', {
      sourceBucket: sourceBucket, sourceFolder: sourceFolder.slice(0, -1), goalBucket, goalBucket, goalFolder: goalFolder + folderName
    })
    .then(() => this.$translate("FILE.MOVE_SUCCESS", { folderName })
      .then(message => {
        this.$file.getFiles();
        this.$toast.show(message);
        this.closeDialog();
      }))
    .catch(() => this.$translate("FILE.MOVE_FAILURE", { folderName })
      .then(message => {
        this.$toast.show(message);
        this.closeDialog();
      }));
  }
}
