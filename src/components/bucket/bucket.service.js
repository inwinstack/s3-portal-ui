import { element } from 'angular';
import { sortByName } from '../../utils/sort';
import BucketCreateController from './create/create.controller';
import BucketCreateTemplate from './create/create.html';
import BucketDeleteController from './delete/delete.controller';
import BucketDeleteTemplate from './delete/delete.html';

export default class BucketService {
  /** @ngInject */
  constructor($fetch, $toast, $mdDialog, $breadcrumb, $translate) {
    Object.assign(this, {
      $fetch, $toast, $mdDialog, $breadcrumb, $translate
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
      delete: {
        name: null,
      }
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
    this.state.create.duplicated = false;
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
    const bucket = this.state.delete.name;
    this.$fetch.delete(`/v1/bucket/delete/${bucket}`)
      .then(() => this.$translate("TOAST.DELETE_BUCKET_SUCCESS", { bucket })
      .then(message => {
        this.state.delete.name = null;
        this.$toast.show(message);
        this.getBuckets();
      }))
      .catch(() => this.$translate("TOAST.DELETE_BUCKET_FAILURE", { bucket })
      .then(message => {
        this.$toast.show(message);
      }))
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

    this.$fetch.get('/v1/bucket/list')
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
   * Send a request with bucket name for create bucket.
   *
   * @param  {string} bucket
   * @return {void}
   */
  createBucket(bucket) {
    return this.$fetch.post('/v1/bucket/create', { bucket })
      .then(({ data }) => {
        this.state.lists.data = data.Buckets.sort(sortByName);
      })
      .then(() => this.$translate('TOAST.CREATE_BUCKET_SUCCESS', { bucket }))
      .then(createSuccess => {
        this.$toast.show(createSuccess);
        this.closeDialog();
      })
      .catch(() => {
        this.state.create.duplicated = true;
        this.$translate('TOAST.CREATE_BUCKET_FAILURE', { bucket })
          .then(createFailure => this.$toast.show(createFailure));
      });
  }
}
