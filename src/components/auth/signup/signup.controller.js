export default class SignUpController {
  /** @ngInject */
  constructor($auth, $state, $toast) {
    Object.assign(this, {
      $auth, $state, $toast,
    });
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
