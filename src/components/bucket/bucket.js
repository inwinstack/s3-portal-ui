import { module } from 'angular';
import router from 'angular-ui-router';

import BucketController from './bucket.controller';
import BucketService from './bucket.service';
import BucketTemplate from './bucket.html';

import ActionNavbarController from './action-navbar/action-navbar.controller';
import ActionNavbarTemplate from './action-navbar/action-navbar.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('bucket', {
    url: '/bucket',
    parent: 'root',
    views: {
      '': {
        controller: BucketController,
        controllerAs: 'bucket',
        template: BucketTemplate,
      },
      'action-navbar@root': {
        template: ActionNavbarTemplate,
        controller: ActionNavbarController,
        controllerAs: 'nav',
      },
    },
  });
};

const Bucket = module('bucket', [
  router,
])
.service('$bucket', BucketService)
.config(route);

export default Bucket.name;
