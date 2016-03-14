import { module } from 'angular';
import FetchService from './fetch.service';

const Fetch = module('fetch', [])
  .service('$fetch', FetchService);

export default Fetch.name;
