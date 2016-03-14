export default class SignInController {
  /** @ngInject */
  constructor($auth, $state, $toast) {
    Object.assign(this, {
      $auth, $state, $toast,
    });
  }

  submit() {
    this.$auth.login(this.credentials)
      .then(() => {
        this.$state.go('dashboard');
        this.$toast.show('Sign In Success!');
      })
      .catch(() => (this.form.$submitted = false));
  }
}
