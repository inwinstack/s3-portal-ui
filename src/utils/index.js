import angular from 'angular';
import Toast from './toast/toast';

export default angular
  .module('app.utils', [
    Toast.name,
  ]);
