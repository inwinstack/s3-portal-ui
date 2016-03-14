import { module } from 'angular';

import './index.css';
import Vendor from './vendor';
import Config from './config';
import Utils from './utils';
import Validators from './validators';
import Components from './components/';

module('app', [
  Vendor,
  Config,
  Utils,
  Validators,
  Components,
]);
