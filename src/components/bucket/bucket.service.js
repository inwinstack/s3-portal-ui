import { element } from 'angular';
import natural from 'javascript-natural-sort';
import BucketCreateController from './create/create.controller';
import BucketCreateTemplate from './create/create.html';

export default class BucketService {
  /** @ngInject */
  constructor($fetch, $toast, $mdDialog) {
    Object.assign(this, {
      $fetch, $toast, $mdDialog,
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

  /**
   * Reset the state of checke bucket.
   *
   * @return {void}
   */
  resetCheckBucketState() {
    this.state.create = {
      checking: false,
      checked: false,
      duplicated: false,
    };
  }

  /**
   * Return a create dialog config for two diffent controller.
   *
   * @param  {Object} $event
   * @return {Object}
   */
  createDialog($event) {
    this.$mdDialog.show({
      controller: BucketCreateController,
      controllerAs: 'create',
      template: BucketCreateTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  /**
   * Close the dialog.
   *
   * @return {void}
   */
  closeDialog() {
    this.$mdDialog.cancel();
    this.resetCheckBucketState();
  }

  /**
   * Natural sort for the specified object key.
   *
   * @param  {Object} a
   * @param  {Object} b
   * @return {Integer}
   */
  sortByName(a, b) {
    const x = a.Name;
    const y = b.Name;

    return natural(x, y);
  }

  /**
   * Call the bucket list API and modify the state of service.
   *
   * @return {void}
   */
  getBuckets() {
    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch.post('/v1/bucket/list')
      .then(({ data }) => {
        this.state.lists.error = false;
        this.state.lists.data = data.Buckets.sort(this.sortByName);
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });
  }

  /**
   * Check the bucket name has created or not.
   *
   * @param  {string} bucket
   * @return {void}
   */
  checkBucket(bucket) {
    this.state.create.checking = true;

    this.$fetch.post('/v1/bucket/check', { bucket })
      .then(() => {
        this.state.create.duplicated = false;
      })
      .catch(() => {
        this.state.create.duplicated = true;
      })
      .finally(() => {
        this.state.create.checking = false;
        this.state.create.checked = true;
      });
  }

  /**
   * Send a request with bucket name for create bucket.
   *
   * @param  {string} bucket
   * @return {void}
   */
  createBucket(bucket) {
    this.$fetch.post('/v1/bucket/create', { bucket })
      .then(({ data }) => {
        this.state.lists.data = data.Buckets.sort(this.sortByName);
        this.$toast.show(`Bucket ${bucket} has created!`);
      })
      .catch(() => {
        this.$toast.show('Bucket create failure, please try again!');
      })
      .finally(() => {
        this.closeDialog();
      });
  }
}
