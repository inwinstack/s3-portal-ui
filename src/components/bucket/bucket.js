import { module } from 'angular';
import router from 'angular-ui-router';

import BucketController from './bucket.controller';
import BucketService from './bucket.service';
import BucketTemplate from './bucket.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('bucket', {
    url: '/bucket',
    parent: 'root',
    controller: BucketController,
    controllerAs: 'bucket',
    template: BucketTemplate,
    onEnter: $nav => $nav.setTypeToBucket(),
    ncyBreadcrumb: {
      label: 'All Buckets ( {{ bucket.data.length }} )',
    },
  });
};

const Bucket = module('bucket', [
  router,
])
.service('$bucket', BucketService)
.config(route);

export default Bucket.name;
