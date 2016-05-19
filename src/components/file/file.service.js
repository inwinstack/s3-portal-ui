export default class FileService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $bucket) {
    Object.assign(this, {
      $mdDialog, $fetch, $bucket,
    });

    this.initState();
  }

  initState() {
    this.state = {
      paths: {
        bucket: '',
        folders: [],
      },
      lists: {
        data: [],
        downloadName: null,
        requesting: false,
        error: false,
      },
    };
  }

  setPaths(bucket, folders) {
    this.paths = { bucket, folders };
  }

  getFiles() {
    const { bucket, folders } = this.paths;
    const endpoint = `/v1/file/list/${bucket}?prefix=${folders.join('/')}`;

    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch
      .get(endpoint)
      .then(({ data }) => {
        this.state.lists.error = false;
        this.state.lists.data = this.formatFilesData(data.files);
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });
  }

  formatFilesData(files) {
    return (files === null) ? [] :
      files.map(file => ({
        ...file,
        checked: false,
      }));
  }

  selectFile(etag) {
    let count = 0;
    let downloadName = null;

    this.state.lists.data = this.state.lists.data.map(file => {
      let checked = file.checked;

      if (file.ETag === etag) checked = ! checked;
      if (checked) count ++;

      return { ...file, checked };
    });

    if (count === 1) {
      const index = this.state.lists.data.findIndex(file => file.checked);
      downloadName = this.state.lists.data[index].Name;
    }

    this.state.lists.downloadName = downloadName;
  }
}
