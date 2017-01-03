import { module } from 'angular';
import filesize from './filesize';

const Filters = module('app.Filters', [])
  .filter('filesize', filesize);

export default Filters.name;
