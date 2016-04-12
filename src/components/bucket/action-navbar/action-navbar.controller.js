export default class ActionNavbarController {
  /** @ngInject */
  constructor($bucket) {
    Object.assign(this, {
      $bucket,
    });
  }

  createBucket($event) {
    this.$bucket.createDialog($event);
  }
}
