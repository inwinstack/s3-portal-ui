export default class FileService {
  /** @ngInject */
  constructor($q, $fetch, $bucket) {
    Object.assign(this, {
      $q, $fetch, $bucket,
    });

    this.initState();
  }

  initState() {
    this.state = {
      paths: {
        bucket: '',
        folders: '',
      },
      lists: {
        data: [],
        requesting: false,
        error: false,
      },
      create: {
        checking: false,
        checked: false,
        duplicated: false,
      },
    };
  }

  setPaths(path) {
    const [bucket, ...folders] = path.split('/');
    this.paths = { bucket, folders };
  }

  getFiles() {
    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch.get(`/v1/file/list/${this.paths.bucket}`)
      .then(({ data }) => {
        this.state.lists.error = false;
        this.state.lists.data = data.files || [];
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });
  }
}
