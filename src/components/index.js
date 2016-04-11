import { module } from 'angular';
import Layout from './layout/layout';
import NotFound from './not-found/not-found';
import Auth from './auth/auth';

const Components = module('app.components', [
  Layout,
  NotFound,
  Auth,
]);

export default Components.name;
