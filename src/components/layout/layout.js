import { module } from 'angular';
import router from 'angular-ui-router';
import LayoutTemplate from './layout.html';

import './layout.css';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('layout', {
    url: '/layout',
    parent: 'root',
    template: LayoutTemplate,
    controllerAs: 'layout',
  });
};

const Layout = module('layout', [
  router,
])
.config(route);

export default Layout.name;
