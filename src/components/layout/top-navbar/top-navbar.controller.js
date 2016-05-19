export default class TopNavbarController {
  /** @ngInject */
  constructor($translate, $auth, $state, $toast, $mdDialog, AuthService) {
    Object.assign(this, {
      $translate, $auth, $state, $toast, $mdDialog, AuthService,
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
    this.showConfirmMessage($event);
  }

  /**
   * Show a confirm message for sign out.
   *
   * @param  {Object} $event
   * @return {Promise}
   */
  showConfirmMessage($event) {
    const sources = [
      'SETTINGS.SIGN_OUT_CONFIRM_TITLE',
      'SETTINGS.SIGN_OUT_CONFIRM_MESSAGE',
      'SETTINGS.SIGN_OUT',
      'SETTINGS.LEAVE',
      'SETTINGS.STAY',
    ];

    this.$translate(sources)
      .then(translations => {
        const confirm = this.$mdDialog.confirm()
          .title(translations[sources[0]])
          .textContent(translations[sources[1]])
          .ariaLabel(translations[sources[2]])
          .targetEvent($event)
          .ok(translations[sources[3]])
          .cancel(translations[sources[4]]);

        this.$mdDialog.show(confirm).then(this.executedSignOut);
      });
  }

  /**
   * Executed sign out when user confirm the message.
   *
   * @return {Promise} [description]
   */
  executedSignOut = () => this.AuthService.signOut()
    .then(() => {
      this.$auth.logout();
      this.$state.go('auth.signin');
      this.$toast.show('Sign Out Success!');
    })
    .catch(() => this.$toast.show('Sign Out Failure!'));
}
