import { module } from 'angular';
import Toast from './toast/toast';
import Fetch from './fetch/fetch';

const Utils = module('app.utils', [
  Toast,
  Fetch,
]);

export default Utils.name;
