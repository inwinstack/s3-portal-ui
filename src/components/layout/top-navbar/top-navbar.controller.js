export default class TopNavbarController {
  /** @ngInject */
  constructor($scope, $translate, $auth, $state, $toast, $mdDialog, $transfer, AuthService) {
    Object.assign(this, {
      $scope, $translate, $auth, $state, $toast, $mdDialog, $transfer, AuthService,
    });

    this.languages = [
      { key: 'EN', name: 'English' },
      { key: 'TW', name: '繁體中文' },
      { key: 'CN', name: '简体中文' },
    ];

    this.currentLanguage = $translate.use();
  }

  /**
   * Change the language of UI.
   *
   * @param  {string} key
   * @return {void}
   */
  changeLanguage(key) {
    this.$translate.use(key);
    this.currentLanguage = key;
  }

  /**
   * Do the sign out flow when user click the sign out button.
   *
   * @param  {Object} $event
   * @return {void}
   */
  signOut($event) {
    if (this.$transfer.isProcessing()) {
      this.showConfirmMessage($event).then(this.executedSignOut);
    } else {
      this.executedSignOut();
    }
  }

  /**
   * Show a confirm message for sign out.
   *
   * @param  {Object} $event
   * @return {Promise}
   */
  showConfirmMessage($event) {
    const confirm = this.$mdDialog.confirm()
      .title('Would you like to sign out without your upload?')
      .textContent(`You have in progress opreations
or uploads and leaving now will cancel them.Still leaving?`)
      .ariaLabel('Sign out')
      .targetEvent($event)
      .ok('Leave')
      .cancel('Stay');

    return this.$mdDialog.show(confirm);
  }

  /**
   * Executed sign out when user confirm the message.
   *
   * @return {Promise} [description]
   */
  executedSignOut = () => this.AuthService.signOut()
    .then(() => {
      this.$transfer.abort();
      this.$auth.logout();
      this.$state.go('auth.signin');
      this.$toast.show('Sign Out Success!');
    })
    .catch(() => this.$toast.show('Sign Out Failure!'));
}
