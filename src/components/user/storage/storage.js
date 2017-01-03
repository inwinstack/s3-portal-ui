import { module } from 'angular';
import router from 'angular-ui-router';

import StorageController from './storage.controller';
import StorageTemplate from './storage.html';

import './storage.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('user.storage', {
    url: '/storage',
    parent: 'user',
    template: StorageTemplate,
    controller: StorageController,
    controllerAs: 'storage',
  });
};

const Storage = module('storage', [
  router,
])
.config(route);

export default Storage.name;
