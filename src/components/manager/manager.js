import { module } from 'angular';
import router from 'angular-ui-router';

import ManagerTemplate from './manager.html';
import TopNavbarController from '../layout/top-navbar/top-navbar.controller';
import TopNavbarTemplate from '../layout/top-navbar/top-navbar.html';
import ActionNavbarController from '../layout/action-navbar/action-navbar.controller';
import ActionNavbarTemplate from '../layout/action-navbar/action-navbar.html';
import ActionNavbarService from '../layout/action-navbar/action-navbar.service';
import SidebarTemplate from '../layout/sidebar/sidebar.html';
import SidebarController from '../layout/sidebar/sidebar.controller';
import ManagerNavbarController from '../layout/manager-navbar/manager-navbar.controller';
import ManagerNavbarTemplate from '../layout/manager-navbar/manager-navbar.html';
import ManagerNavbarService from '../layout/manager-navbar/manager-navbar.service';
import ManagerService from './manager.service';
import List	from './list/list';
import './manager.css';
import '../layout/sidebar/sidebar.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('manager', {
    url: '/manager',
    abstract: true,
    views: {
      '': {
        template: ManagerTemplate,
      },
      'top-navbar@manager': {
        template: TopNavbarTemplate,
        controller: TopNavbarController,
        controllerAs: 'topNav',
      },
      'manager-navbar@manager': {
      	template: ManagerNavbarTemplate,
      	controller: ManagerNavbarController,
      	controllerAs: 'managerNav',
      },
      'sidebar@manager': {
        template: SidebarTemplate,
        controller: SidebarController,
        controllerAs: 'sidenav',
      }
    }
  });
};

const Manager = module('manager', [
  router,

  List,
])
.service('$manager', ManagerService)
.service('$managerNav', ManagerNavbarService)
.config(route);


export default Manager.name;
