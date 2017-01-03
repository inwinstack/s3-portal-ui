import { module } from 'angular';
import email from './email';
import bucket from './bucket';

const Directives = module('app.Directives', [])
  .directive('email', email)
  .directive('bucket', bucket);

export default Directives.name;
