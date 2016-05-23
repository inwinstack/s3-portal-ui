export default class SignInController {
  /** @ngInject */
  constructor($auth, $state, $toast, $translate) {
    Object.assign(this, {
      $auth, $state, $toast, $translate, credentials: {},
    });
  }

  /**
   * Log in a exists user.
   *
   * @return void
   */
  submit() {
    this.$auth.login(this.credentials)
      .then(() => this.$translate('TOAST.SIGN_IN_SUCCESS'))
      .then(signInSuccess => {
        this.$state.go('bucket');
        this.$toast.show(signInSuccess);
      })
      .catch(() => {
        this.form.$submitted = false;
        this.incorrect = true;
      });
  }
}
