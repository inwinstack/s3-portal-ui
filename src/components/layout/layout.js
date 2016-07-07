import { module } from 'angular';
import router from 'angular-ui-router';

import LayoutController from './layout.controller';
import LayoutService from './layout.service';
import LayoutTemplate from './layout.html';
import TopNavbarController from './top-navbar/top-navbar.controller';
import TopNavbarTemplate from './top-navbar/top-navbar.html';
import BreadcrumbController from './breadcrumb/breadcrumb.controller';
import BreadcrumbTemplate from './breadcrumb/breadcrumb.html';
import BreadcrumbService from './breadcrumb/breadcrumb.service';
import ActionNavbarController from './action-navbar/action-navbar.controller';
import ActionNavbarTemplate from './action-navbar/action-navbar.html';
import ActionNavbarService from './action-navbar/action-navbar.service';
import TransferController from './transfer/transfer.controller';
import TransferTemplate from './transfer/transfer.html';
import TransferService from './transfer/transfer.service';
import PropertiesTemplate from './properties/properties.html';
import PropertiesController from './properties/properties.controller';
import PropertiesService from './properties/properties.service';

import './layout.css';
import './transfer/transfer.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('root', {
    abstract: true,
    url: '',
    views: {
      '': {
        template: LayoutTemplate,
        controller: LayoutController,
        controllerAs: 'layout',
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
      'breadcrumb@root': {
        template: BreadcrumbTemplate,
        controller: BreadcrumbController,
        controllerAs: 'bc',
      },
      'transfer@root': {
        template: TransferTemplate,
        controller: TransferController,
        controllerAs: 'transfer',
      },
      'properties@root': {
        template: PropertiesTemplate,
        controller: PropertiesController,
        controllerAs: 'propertie',
      },
    },
  });
};

const Layout = module('layout', [
  router,
])
.service('$breadcrumb', BreadcrumbService)
.service('$nav', ActionNavbarService)
.service('$layout', LayoutService)
.service('$transfer', TransferService)
.service('$properties', PropertiesService)
.config(route);

export default Layout.name;
