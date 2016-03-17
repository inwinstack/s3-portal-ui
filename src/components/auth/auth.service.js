export default class AuthService {
  /** @ngInject */
  constructor($fetch) {
    this.$fetch = $fetch;
  }

  /**
   * Send a request to server for check the email.
   *
   * @param  {string}  email
   * @return {promise}
   */
  checkEmail(email) {
    return this.$fetch.post('/v1/auth/checkEmail', { email });
  }
}
