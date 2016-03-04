/** @ngInject */
export default ($authProvider, Config) => {
  const { API_URL } = Config;

  $authProvider.tokenName = 'id_token';

  $authProvider.loginUrl = `${API_URL}/sessions/create`;
  $authProvider.signupUrl = `${API_URL}/users`;
};
