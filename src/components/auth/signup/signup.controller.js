export default class SignUpController {
  /** @ngInject */
  constructor($auth, $state, $toast, AuthService) {
    Object.assign(this, {
      $auth, $state, $toast, AuthService, credentials: {},
    });
  }

  /**
   * Check whether the email is used if user email is valid.
   *
   * @return void
   */
  checkEmail() {
    if (this.form.email.$valid) {
      const { email } = this.credentials;
      this.isCheckEmail = true;

      this.AuthService.checkEmail(email)
        .then(() => {
          this.emailIsValid = true;
          this.emailIsInvalid = false;
        })
        .catch(() => {
          this.emailIsValid = false;
          this.emailIsInvalid = true;
          this.showEmailCheckedMessage = true;
        })
        .finally(() => (this.isCheckEmail = false));
    } else {
      this.showEmailCheckedMessage = false;
    }
  }

  /**
   * Register a new user.
   *
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
