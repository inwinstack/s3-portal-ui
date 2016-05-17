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
    this.paths = [{
      link: '/bucket',
      text: 'All Bucket',
      isBucket: true,
      len: 0,
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
    paths.forEach(path => {
      const pathLink = this.paths.map(({ link }) => link).join('');
      this.paths.push({ link: pathLink, text: path });
    });
  }
}
