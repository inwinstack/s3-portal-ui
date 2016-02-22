import angular from 'angular';
import notFound from './notFound/notFound';

export default angular
  .module('app.components', [
    notFound.name,
  ]);
