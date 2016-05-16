export default class BreadcrumbService {
  /** @ngInject */
  constructor() {
    this.initPaths();
  }

  initPaths() {
    this.paths = [{
      link: '/bucket',
      text: 'All Bucket',
      isBucket: true,
      len: 0,
    }];
  }

  updateBucketPath(len) {
    this.paths[0].len = len;
  }
}
