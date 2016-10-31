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
      .catch((res) => {
        this.form.$submitted = false;
        if (res.status != -1) {
          if (res.data.message == 'Connection to Ceph failed') {
            this.$translate('TOAST.CONNECT_CEPH_ERROR')
              .then(message => {
                this.$toast.show(message);
              })
          } else {
            this.incorrect = true;
          }
        } else {
          this.incorrect = false;
          this.$translate('TOAST.CONNECT_ERROR')
            .then(message => {
              this.$toast.show(message);
            })
        }
      });
  }
}
