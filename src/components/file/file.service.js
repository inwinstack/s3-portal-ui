import getIconString from '../../utils/icon';
import { sortFiles } from '../../utils/sort';

export default class FileService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $bucket, $toast, $injector, Config, $http, $translate) {
    Object.assign(this, {
      $mdDialog, $fetch, $bucket, $toast, $injector, Config, $http, $translate,
    });

    this.initState();
  }

  initState() {
    this.state = {
      paths: {
        bucket: '',
        prefix: '',
      },
      lists: {
        data: [],
        downloadName: null,
        requesting: false,
        error: false,
      },
    };
  }

  getFullPaths() {
    const { bucket, prefix } = this.state.paths;
    return `${bucket}/${prefix}`;
  }

  setPaths(bucket, prefix) {
    this.state.paths = { bucket, prefix };
  }

  getFiles() {
    const { bucket, prefix } = this.state.paths;
    const endpoint = `/v1/file/list/${bucket}?prefix=${prefix}`;

    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch
      .get(endpoint)
      .then(({ data }) => {
        this.state.lists.error = false;
        this.state.lists.data = sortFiles(this.formatFilesData(data.files));
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });
  }

  getIcon(name) {
    return getIconString(name);
  }

  formatFileType(name) {
    const isFolder = name.endsWith('/');
    const removeSlash = isFolder ? name.slice(0, -1) : name;
    const display = removeSlash.replace(this.state.paths.prefix, '');
    return { isFolder, display };
  }

  formatFilesData(files) {
    const { prefix } = this.state.paths;
    const baseLen = prefix.split('/').length;

    return (! files) ? [] :
      files.filter(({ Key }) => {
        const { length } = Key.split('/');
        return (
          length === baseLen
          || length === baseLen + 1
          && Key.endsWith('/')
        ) && Key !== prefix;
      }).map(file => ({
        ...file,
        ...this.formatFileType(file.Key),
        icon: this.getIcon(file.Key),
        checked: false,
      }));
  }

  selectFile(name) {
    let count = 0;
    let downloadName = null;

    this.state.lists.data = this.state.lists.data.map(file => {
      let checked = file.checked;

      if (file.Key === name) checked = ! checked;
      if (checked) count ++;

      return { ...file, checked };
    });

    if (count === 1) {
      const index = this.state.lists.data.findIndex(file => file.checked);
      const { isFolder, display } = this.state.lists.data[index];
      if (! isFolder) {
        downloadName = display;
      }
    }

    this.state.lists.downloadName = downloadName;
  }

  deleteObject(id, bucket, { Key, isFolder }) {
    const objectType = isFolder ? 'folder' : 'file';
    const key = isFolder ? Key.slice(0, -1) : Key;
    return this.$fetch.delete(`/v1/${objectType}/delete/${bucket}/${key}`)
      .then(res => this.$injector.get('$transfer').handleDeleteSuccess(id, res))
      .catch(err => this.$injector.get('$transfer').handleDeleteFailure(id, err));
  }

  deleteDialog($event) {
    const sources = [
      'FILE.DELETE_TITLE',
      'FILE.DELETE_DESCRIPTION',
      'FILE.DELETE_ARIA_LABEL',
      'UTILS.DELETE',
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
        .then(() => this.delete())
      );
  }

  delete() {
    const { data } = this.state.lists;
    const { bucket } = this.state.paths;
    const deleteObjects = data.filter(({ checked }) => checked);
    const deleteTransfers = deleteObjects.map(object => {
      const id = Symbol('unique id');
      const request = this.deleteObject(id, bucket, object);
      return {
        id,
        request,
        bucket,
        name: object.display,
        type: 'DELETE',
        status: 'DELETING',
      };
    });

    this.$injector.get('$transfer').putDelete(deleteTransfers);
  }

  downloadFile(uri, fileName) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = `${this.Config.BASE_URL}${uri}`;
    a.click();
  }

  download() {
    const { bucket, prefix } = this.state.paths;
    const { downloadName } = this.state.lists;
    const url = `${this.Config.API_URL}/v1/file/get/${bucket}/${prefix}${downloadName}`;

    this.$http({ url, responseType: 'arraybuffer' })
      .then(({ data }) => {
        const blob = new Blob([data]);
        const href = URL.createObjectURL(blob);
        const anchor = document.createElement('a');

        anchor.href = href;
        anchor.download = downloadName;
        anchor.click();

        URL.revokeObjectURL(href);
      })
      .catch(() => {
        this.$toast.show(`The ${downloadName} doesn't exist, please try again!`);
        this.getFiles();
      });
  }
}
