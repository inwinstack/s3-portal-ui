import { module } from 'angular';
import router from 'angular-ui-router';
import NotFoundTemplate from './not-found.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('not-found', {
    url: '/404',
    template: NotFoundTemplate,
    noAuth: true,
  });
};

const NotFound = module('notFound', [
  router,
])
.config(route);

export default NotFound.name;
