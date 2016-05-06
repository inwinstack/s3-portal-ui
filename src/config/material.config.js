/** @ngInject */
export default ($mdThemingProvider) => {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .warnPalette('orange')
    .accentPalette('indigo');
};
