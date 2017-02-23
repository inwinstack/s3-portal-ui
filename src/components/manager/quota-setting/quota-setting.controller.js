export default class QuotaSettingController {
  /** @ngInject */
  constructor($scope, $mdDialog, $manager, user, $fetch, $toast, $translate) {
    Object.assign(this, {
      $scope, $mdDialog, $manager, $fetch, $toast, $translate
    });

    this.user = user;
    this.quotaSize = 5;
  }

  cancel() {
    this.$manager.closeDeleteDialog();
  }

  submit() {
    this.$fetch.post(`/v1/auth/setUserQuota`, {   
              "email": this.user.email,
              "maxSizeKB": (this.quotaSize * 1024 * 1024),
              "enabled" : true
            })
      .then(() => this.$translate("TOAST.SET_USER_QUOTA_SUCCESS")
        .then(message => {
          this.$toast.show(message);
          this.$manager.getAccounts();
        }))
      .catch(() => this.$translate("TOAST.SET_USER_QUOTA_FAIL")
        .then(message => {
          this.$toast.show(message);
        }))
      .finally(() => {
        this.$mdDialog.cancel();
      })
  }
}
