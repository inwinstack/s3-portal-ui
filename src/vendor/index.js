import { module } from 'angular';
import router from 'angular-ui-router';
import material from 'angular-material';
import translate from 'angular-translate';
import validationMatch from 'angular-validation-match';
import fileUpload from 'ng-file-upload';
import satellizer from 'satellizer';
import ngCookies from 'angular-cookies';

const Vendor = module('app.vendor', [
  router,
  material,
  translate,
  validationMatch,
  satellizer,
  fileUpload,
  ngCookies,
]);

export default Vendor.name;
