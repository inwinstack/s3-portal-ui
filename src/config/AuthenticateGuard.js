/** @ngInject */
export default ($rootScope, $state, $auth, $toast, AuthService) => {
  $rootScope.$on('$stateChangeStart', (event, next) => {
    if (next.noAuth) {
      if ($auth.isAuthenticated()) {
        event.preventDefault();
        $state.go('bucket');
      }
      return;
    }
    if (next.isAdmin) {
      if (!AuthService.checkAdmin()) {
        event.preventDefault();
        $state.go('bucket');
      }
      return;
    }


    if (! $auth.isAuthenticated()) {
      event.preventDefault();
      $state.go('auth.signin');
      $toast.show('You should Login!');
    }
  });

  $rootScope.$on('$routeChangeError', ($event, current, previous, rejection) => {
    if (rejection.status === 404) {
      $state.go('404');
    }
  });
};
