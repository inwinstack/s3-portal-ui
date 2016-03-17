/** @ngInject */
export default ($authProvider, Config) => {
  const { API_URL } = Config;

  $authProvider.loginUrl = `${API_URL}/v1/auth/login`;
  $authProvider.signupUrl = `${API_URL}/v1/auth/register`;
};
