import { module } from 'angular';

import './index.css';
import './templates';
import Vendor from './vendor';
import Config from './config';
import Utils from './utils';
import Directives from './directives';
import Components from './components';

module('app', [
  Vendor,
  Config,
  Utils,
  Directives,
  Components,
]);
