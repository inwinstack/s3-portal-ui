import { module } from 'angular';
import router from 'angular-ui-router';

import ListController from './list.controller';
import ListTemplate from './list.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('manager.list', {
    url: '',
    parent: 'manager',
    template: ListTemplate,
    controller: ListController,
    controllerAs: 'list',
    isAdmin: true,
  });
};

const List = module('manager.list', [
  router,
])
.config(route);

export default List.name;
