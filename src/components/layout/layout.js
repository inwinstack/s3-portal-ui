import { module } from 'angular';
import router from 'angular-ui-router';

import LayoutTemplate from './layout.html';
import TopNavbarController from './top-navbar/top-navbar.controller';
import TopNavbarTemplate from './top-navbar/top-navbar.html';

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
        controllerAs: 'nav',
      },
    },
  });
};

const Layout = module('layout', [
  router,
])
.config(route);

export default Layout.name;
