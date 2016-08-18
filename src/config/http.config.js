const TokenInterceptor = ($q, $injector) => ({
  responseError(rejection) {
    const { data } = rejection;
    if (data) {
	    if (data.error && data.error === 'token_not_provided' || data.error === 'token_invalid') {
	      $injector.get('$auth').logout();
	      $injector.get('$state').go('auth.signin');
	      $injector.get('$toast').show('Your token has expired, please sign in again!');
	    }
    }
    return $q.reject(rejection);
  },
});

/** @ngInject */
export default $httpProvider => $httpProvider.interceptors.push(TokenInterceptor);
