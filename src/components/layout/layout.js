import { module } from 'angular';
import router from 'angular-ui-router';

import LayoutTemplate from './layout.html';
import TopNavbarController from './top-navbar/top-navbar.controller';
import TopNavbarTemplate from './top-navbar/top-navbar.html';
import BreadcrumbController from './breadcrumb/breadcrumb.controller';
import BreadcrumbTemplate from './breadcrumb/breadcrumb.html';
import BreadcrumbService from './breadcrumb/breadcrumb.service';

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
      'breadcrumb@root': {
        template: BreadcrumbTemplate,
        controller: BreadcrumbController,
        controllerAs: 'bc',
      },
    },
  });
};

const Layout = module('layout', [
  router,
])
.service('$breadcrumb', BreadcrumbService)
.config(route);

export default Layout.name;
