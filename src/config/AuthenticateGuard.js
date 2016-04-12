/** @ngInject */
export default ($rootScope, $state, $auth, $toast, $timeout) => {
  $rootScope.$on('$stateChangeStart', (event, next) => {
    if (next.noAuth) {
      if ($auth.isAuthenticated()) {
        event.preventDefault();
        $timeout(() => $state.go('bucket'), 0);
      }
      return;
    }

    if (! $auth.isAuthenticated()) {
      event.preventDefault();
      $toast.show('You should Login!');
      $timeout(() => $state.go('auth.signin'), 0);
    }
  });

  $rootScope.$on('$routeChangeError', ($event, current, previous, rejection) => {
    if (rejection.status === 404) {
      $timeout(() => $state.go('404'), 0);
    }
  });
};
