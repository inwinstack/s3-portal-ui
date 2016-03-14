export default class DashboardController {
  /** @ngInject */
  constructor($auth, $state, $toast) {
    Object.assign(this, {
      $auth, $state, $toast,
    });
  }

  logout() {
    this.$auth.logout();
    this.$state.go('auth.signin');
    this.$toast.show('Logout Success!');
  }
}
