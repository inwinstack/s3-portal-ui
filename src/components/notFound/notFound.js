import { module } from 'angular';
import router from 'angular-ui-router';
import NotFoundTemplate from './notFound.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('notFound', {
    url: '/404',
    template: NotFoundTemplate,
  });
};

const NotFound = module('notFound', [
  router,
])
.config(route);

export default NotFound.name;
