export default () => ({
  require: 'ngModel',
  link(scope, elm, attrs, ctrl) {
    ctrl.$validators.email = (modelValue, viewValue) => /^.+@.+\..+$/.test(viewValue);
  },
});
