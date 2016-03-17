export default class SignUpController {
  /** @ngInject */
  constructor($auth, $state, $toast, $fetch) {
    Object.assign(this, {
      $auth, $state, $toast, $fetch, credentials: {},
    });
  }

  /**
   * Check whether the email is used.
   * @return void
   */
  checkEmail() {
    if (this.form.email.$valid) {
      this.checkEmailRequest();
    }
  }

  /**
   * Send a request to server for check the email.
   * @return void
   */
  checkEmailRequest() {
    const { email } = this.credentials;
    this.isCheckEmail = true;

    this.$fetch.post('/v1/auth/checkEmail', { email })
      .then(() => {
        this.emailIsValid = true;
        this.emailIsInvalid = false;
      })
      .catch(() => {
        this.emailIsValid = false;
        this.emailIsInvalid = true;
      })
      .finally(() => (this.isCheckEmail = false));
  }

  /**
   * Register a new user.
   * @return void
   */
  submit() {
    this.$auth.signup(this.credentials)
      .then(() => {
        this.$state.go('auth.signin');
        this.$toast.show('Sign Up Success!');
      })
      .catch(() => (this.form.$submitted = false));
  }
}
