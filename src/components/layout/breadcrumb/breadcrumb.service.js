export default class BreadcrumbService {
  /** @ngInject */
  constructor() {
    this.initPaths();
  }

  /**
   * Initial the paths state.
   *
   * @return {void}
   */
  initPaths() {
    const len = (typeof this.paths === 'undefined') ? 0 : this.paths[0].len;

    this.paths = [{
      link: '/bucket',
      text: 'All Bucket',
      isBucket: true,
      len,
    }];
  }

  /**
   * Update the files length of bucket.
   *
   * @param  {integer} len
   *
   * @return {void}
   */
  updateBucketPath(len) {
    this.paths[0].len = len;
  }

  /**
   * Update paths in breadcrumb bar.
   *
   * @param  {Array} paths
   *
   * @return {void}
   */
  updateFilePath(paths) {
    this.initPaths();
    paths.reduce((previous, current) => {
      const link = `${previous}/${current}`;
      this.paths.push({ link, text: current });
      return link;
    }, '/bucket');
  }
}
