import { module } from 'angular';
import email from './email';

const Directives = module('app.Directives', [])
  .directive('email', email);

export default Directives.name;
