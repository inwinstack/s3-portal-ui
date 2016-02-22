import angular from 'angular';
import ToastService from './toast.service';

export default angular
  .module('toast', [])
  .service('ToastService', ToastService);
