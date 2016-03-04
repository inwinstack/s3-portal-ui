import { module } from 'angular';
import router from 'angular-ui-router';
import DashboardController from './dashboard.controller';
import DashboardTemplate from './dashboard.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: DashboardTemplate,
    controller: DashboardController,
    controllerAs: 'dashboard',
  });
};

const Dashboard = module('dashboard', [
  router,
])
.config(route);

export default Dashboard.name;
