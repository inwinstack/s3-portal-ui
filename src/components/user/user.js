import { module } from 'angular';
import router from 'angular-ui-router';

import UserTemplate from './user.html';
import TopNavbarController from '../layout/top-navbar/top-navbar.controller';
import TopNavbarTemplate from '../layout/top-navbar/top-navbar.html';
import ManagerService from '../manager/manager.service';
import Storage from './storage/storage';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('user', {
    url: '/user',
    abstract: true,
    views: {
      '': {
        template: UserTemplate,
      },
      'top-navbar@user': {
        template: TopNavbarTemplate,
        controller: TopNavbarController,
        controllerAs: 'topNav',
      },
    }
  });
};

const User = module('user', [
  router,
  Storage,
])
.service('$manager', ManagerService)
.config(route);


export default User.name;
