import { module } from 'angular';
import router from 'angular-ui-router';

import LayoutTemplate from './layout.html';
import TopNavbarController from './top-navbar/top-navbar.controller';
import TopNavbarTemplate from './top-navbar/top-navbar.html';
import ActionNavbarController from './action-navbar/action-navbar.controller';
import ActionNavbarTemplate from './action-navbar/action-navbar.html';
import ActionNavbarService from './action-navbar/action-navbar.service';

import './layout.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('root', {
    abstract: true,
    url: '',
    views: {
      '': {
        template: LayoutTemplate,
      },
      'top-navbar@root': {
        template: TopNavbarTemplate,
        controller: TopNavbarController,
        controllerAs: 'topNav',
      },
      'action-navbar@root': {
        template: ActionNavbarTemplate,
        controller: ActionNavbarController,
        controllerAs: 'actionNav',
      },
    },
  });
};

const Layout = module('layout', [
  router,
])
.service('$nav', ActionNavbarService)
.config(route);

export default Layout.name;
