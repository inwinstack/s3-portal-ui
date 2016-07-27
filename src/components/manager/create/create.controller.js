export default class AccountCreateController {
  /** @ngInject */
  constructor($manager, $fetch, $mdDialog, AuthService, $translate) {
    Object.assign(this, {
      $manager, $fetch, $mdDialog, AuthService, $translate, credentials: {},
    });
  }

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

  cancel() {
    this.$mdDialog.cancel();
  }

  submit() {
    this.$fetch.post("/v1/admin/create", this.credentials)
      .then(() => this.$translate('TOAST.SIGN_UP_SUCCESS'))
      .then(signUpSuccess => {
        this.$mdDialog.cancel();
        this.$manager.getAccounts();
        this.$toast.show(signUpSuccess);
      })
      .catch(() => (this.form.$submitted = false));
  }

}
