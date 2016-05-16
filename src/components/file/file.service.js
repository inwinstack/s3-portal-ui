export default class FileService {
  /** @ngInject */
  constructor($fetch, $bucket) {
    Object.assign(this, {
      $fetch, $bucket,
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
