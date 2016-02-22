import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import translate from 'angular-translate';

import './index.css';
import Components from './components/';
import Utils from './utils';
import Config from './config';

angular.module('app', [
  uiRouter,
  ngMaterial,
  translate,

  Config.name,
  Components.name,
  Utils.name,
]);
