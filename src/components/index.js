import { module } from 'angular';
import Layout from './layout/layout';
import NotFound from './not-found/not-found';
import Auth from './auth/auth';
import Bucket from './bucket/bucket';
import File from './file/file';
import Manager from './manager/manager';

const Components = module('app.components', [
  Layout,
  NotFound,
  Auth,
  Bucket,
  File,
  Manager,
]);

export default Components.name;
