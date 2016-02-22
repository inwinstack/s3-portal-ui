import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NotFoundController from './notFound.controller';
import NotFoundTemplate from './notFound.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('notFound', {
    url: '/404',
    template: NotFoundTemplate,
    controller: 'NotFoundController',
    controllerAs: 'notFound',
  });
};

export default angular
  .module('notFound', [
    uiRouter,
  ])
  .controller('NotFoundController', NotFoundController)
  .config(route);
