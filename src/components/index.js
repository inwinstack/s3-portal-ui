import { module } from 'angular';
import NotFound from './notFound/notFound';
import Auth from './auth/auth';
import Dashboard from './dashboard/dashboard';

const Components = module('app.components', [
  NotFound,
  Auth,
  Dashboard,
]);

export default Components.name;
