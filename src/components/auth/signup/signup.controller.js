export default class SignUpController {
  /** @ngInject */
  constructor($auth, $state, $toast, $translate, AuthService) {
    Object.assign(this, {
      $auth, $state, $toast, $translate, AuthService, credentials: {},
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
        .catch((res) => {
          this.emailIsValid = false;
          this.emailIsInvalid = true;
          if (res.status !== -1) {
            this.showEmailCheckedMessage = true;
          } else {
            this.showEmailCheckedMessage = false;
            this.$translate('TOAST.CONNECT_ERROR')
              .then(message => {
                this.$toast.show(message);
              });
          }
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
      .then(() => this.$translate('TOAST.SIGN_UP_SUCCESS'))
      .then(signUpSuccess => {
        this.$state.go('auth.signin');
        this.$toast.show(signUpSuccess);
      })
      .catch((res) => {
        this.form.$submitted = false;
        if (res.status == -1) {
          this.$translate('TOAST.CONNECT_ERROR')
            .then(message => {
              this.$toast.show(message);
            })
          }
      });
  }
}
