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

  $rootScope.$on('$routeChangeError', (arg1, arg2, arg3, arg4) => {
    if (arg4.status === 404) {
      $timeout(() => $state.go('404'), 0);
    }
  });
};
