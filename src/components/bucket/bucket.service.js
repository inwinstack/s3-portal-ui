import natural from 'javascript-natural-sort';

export default class BucketService {
  /** @ngInject */
  constructor($fetch) {
    Object.assign(this, {
      $fetch,
    });

    this.initState();
  }

  /**
   * Initial the state of bucket service.
   *
   * @return {void}
   */
  initState() {
    this.state = {
      lists: [],
      requesting: false,
      error: false,
    };
  }

  /**
   * Call the bucket list API and modify the state of service.
   *
   * @return {void}
   */
  getBuckets() {
    this.state.requesting = true;
    this.state.lists = [];

    this.$fetch.post('/v1/bucket/list')
      .then(({ data }) => {
        this.state.error = false;
        this.state.lists = data.Buckets.sort(natural);
      })
      .catch(() => {
        this.state.error = true;
      })
      .finally(() => {
        this.state.requesting = false;
      });
  }
}
