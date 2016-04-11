import { module } from 'angular';
import Layout from './layout/layout';
import NotFound from './not-found/not-found';
import Auth from './auth/auth';
import Bucket from './bucket/bucket';

const Components = module('app.components', [
  Layout,
  NotFound,
  Auth,
  Bucket,
]);

export default Components.name;
