export default () => ({
  require: 'ngModel',
  link(scope, elm, attrs, ctrl) {
    ctrl.$validators.bucket = (modelValue, viewValue) => /(?=.*[A-Z])/.test(viewValue);
  },
});
