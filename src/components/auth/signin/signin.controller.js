export default class SignInController {
  /** @ngInject */
  constructor($auth, $state, $toast, $translate, $cookies) {
    Object.assign(this, {
      $auth, $state, $toast, $translate, $cookies, credentials: {},
    });

    this.languages = [
      { key: 'EN', name: 'English' },
      { key: 'TW', name: '繁體中文' },
      { key: 'CN', name: '简体中文' },
    ];
    this.currentLanguage = $translate.use();
  }

  changeLanguage(key) {
    this.$translate.use(key);
    this.currentLanguage = key;
  }

  /**
   * Log in a exists user.
   *
   * @return void
   */
  submit() {
    this.$auth.login(this.credentials)
      .then(res => {
        // this.AuthService.role = res.data.role;
        this.$cookies.put('role', res.data.role);
        this.$translate('TOAST.SIGN_IN_SUCCESS')
          .then(signInSuccess => {
            this.$state.go('bucket');
            this.$toast.show(signInSuccess);
          })
      })
      .catch(() => {
        this.form.$submitted = false;
        this.incorrect = true;
      });
  }
}
