import { module } from 'angular';
import email from './email';

const Validators = module('app.Validators', [])
  .directive('email', email);

export default Validators.name;
