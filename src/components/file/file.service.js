export default class FileService {
  /** @ngInject */
  constructor($mdDialog, $fetch, $bucket, $toast, Config) {
    Object.assign(this, {
      $mdDialog, $fetch, $bucket, $toast, Config,
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
      downloadName = this.state.lists.data[index].Key;
    }

    this.state.lists.downloadName = downloadName;
  }

  downloadFile(uri, fileName) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = `${this.Config.BASE_URL}${uri}`;
    console.log(a.href)
    a.click();
  }

  download() {
    const { bucket, prefix } = this.state.paths;
    const { downloadName } = this.state.lists;
    const endpoint = `/v1/file/get/${bucket}/${prefix}${downloadName}`;

    this.$fetch.get(endpoint)
      .then(({ data }) => {
        const { uri } = data;
        this.downloadFile(uri, downloadName);
      })
      .catch(({ data }) => {
        this.$toast.show(`The ${downloadName} doesn't exist, please try again!`);
        this.getFiles();
      });
  }
}
