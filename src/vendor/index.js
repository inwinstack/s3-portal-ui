import { module } from 'angular';
import router from 'angular-ui-router';
import material from 'angular-material';
import translate from 'angular-translate';
import validationMatch from 'angular-validation-match';
import satellizer from 'satellizer';
import 'angular-breadcrumb';

const Vendor = module('app.vendor', [
  router,
  material,
  translate,
  validationMatch,
  satellizer,
  'ncy-angular-breadcrumb',
]);

export default Vendor.name;
