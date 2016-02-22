/** @ngInject */
export default ($urlMatcherFactoryProvider, $locationProvider, $urlRouterProvider) => {
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
};
