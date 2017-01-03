import { module } from 'angular';
import Toast from './toast/toast';
import Fetch from './fetch/fetch';

const Services = module('app.services', [
  Toast,
  Fetch,
]);

export default Services.name;
