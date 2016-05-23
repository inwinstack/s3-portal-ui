import { element } from 'angular';
import { sortByName } from '../../utils/sort';
import BucketCreateController from './create/create.controller';
import BucketCreateTemplate from './create/create.html';

export default class BucketService {
  /** @ngInject */
  constructor($fetch, $toast, $mdDialog, $breadcrumb) {
    Object.assign(this, {
      $fetch, $toast, $mdDialog, $breadcrumb,
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
        duplicated: false,
      },
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
    this.state.create.duplicated = false;
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
        this.state.lists.data = data.Buckets.sort(sortByName);
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
        this.$breadcrumb.updateBucketPath(this.state.lists.data.length);
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
        this.state.lists.data = data.Buckets.sort(sortByName);
        this.$toast.show(`Bucket ${bucket} has created!`);
        this.closeDialog();
      })
      .catch(() => {
        this.state.create.duplicated = true;
      });
  }
}
