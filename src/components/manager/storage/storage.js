import { module } from 'angular';
import router from 'angular-ui-router';

import StorageController from './storage.controller';
import StorageTemplate from './storage.html';

import './storage.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('manager.storage', {
    url: '/storage',
    parent: 'manager',
    template: StorageTemplate,
    controller: StorageController,
    controllerAs: 'storage',
  });
};

const Storage = module('manager.storage', [
  router,
])
.config(route);

export default Storage.name;
