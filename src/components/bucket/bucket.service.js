import { element } from 'angular';
import { sortByName } from '../../utils/sort';
import BucketCreateController from './create/create.controller';
import BucketCreateTemplate from './create/create.html';
import BucketDeleteController from './delete/delete.controller';
import BucketDeleteTemplate from './delete/delete.html';

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
        checking: false,
        checked: false,
        duplicated: false,
      },
      delete: {
        name: null,
      }
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

  deleteDialog($event) {
    this.$mdDialog.show({
      controller: BucketDeleteController,
      controllerAs: 'delete',
      template: BucketDeleteTemplate,
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

  selectBucket(name) {
    const { data } = this.state.lists;
    const index = data.findIndex(bucket => bucket.Name === name);
    this.state.lists.data = data.map((bucket, id) => ({
      ...bucket,
      checked: (id === index) ? ! bucket.checked : false,
    }));

    this.state.delete.name = this.state.lists.data[index].checked ? data[index].Name : null;
  }

  deleteBucket() {
    const { name } = this.state.delete;
    this.$fetch.delete(`/v1/bucket/delete/${name}`)
      .then(() => {
        this.state.delete.name = null;
        this.$toast.show(`Bucket ${name} has been deleted!`);
        this.getBuckets();
      })
      .catch(err => {
        this.$toast.show(`Bucket ${name} delete failed, please try again!`);
      })
      .finally(() => {
        this.closeDialog();
      });
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
        const buckets = data.Buckets.map(bucket => ({
          ...bucket,
          checked: false,
        }));
        this.state.lists.data = buckets.sort(sortByName);
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
        this.state.lists.data = data.Buckets.sort(sortByName);
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
