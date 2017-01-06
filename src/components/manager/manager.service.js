import { element } from 'angular';
import { sortByEmail } from '../../utils/sort';
import AccountCreateController from './create/create.controller';
import AccountCreateTemplate from './create/create.html';
import DeleteAccountController from './delete/delete.controller';
import DeleteAccountTemplate from './delete/delete.html';
import ResetPasswordController from './reset/reset.controller';
import ResetPasswordTemplate from './reset/reset.html';
import QuotaSettingController from './quota-setting/quota-setting.controller';
import QuotaSettingTemplate from './quota-setting/quota-setting.html';


/** @ngInject */
export default class ManagerService {
  constructor($toast, $mdDialog, $fetch, $translate) {
    Object.assign(this, {
      $toast, $mdDialog, $fetch, $translate,
    });

    this.state = {
      lists: {
        data: [],
        requesting: false,
        error: false,
      }
    };
  }

  getAccounts() {
    this.state.lists.requesting = true;
    this.state.lists.data = [];

    this.$fetch.get('/v1/admin/list')
      .then(({ data }) => {
        this.state.lists.error = false;
        const users = data.Users.map(account => ({
          ...account,
          checked: false,
        }));
        this.state.lists.data = users.sort(sortByEmail);
      })
      .catch(() => {
        this.state.lists.error = true;
      })
      .finally(() => {
        this.state.lists.requesting = false;
      });

  }


  selectAccount(id) {
    this.state.lists.data = this.state.lists.data.map(user => {
      let checked = user.checked;

      if (id === user.id) checked = ! checked;

      return { ...user, checked };
    });
  }

  createQuotaSettingDiag($event) {
    this.$mdDialog.show({
      controller: QuotaSettingController,
      controllerAs: 'quota',
      template: QuotaSettingTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      // onRemoving: () => {
      //   this.state.duplicated = false;
      // }
    });
  }

  createAccountDialog($event) {
    this.$mdDialog.show({
      controller: AccountCreateController,
      controllerAs: 'create',
      template: AccountCreateTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  deleteDialog($event) {
    this.$mdDialog.show({
      controller: DeleteAccountController,
      controllerAs: 'delete',
      template: DeleteAccountTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  closeDeleteDialog() {
    this.$mdDialog.cancel();
  }

  deleteAccount(account) {
    const { name } = account;
    this.$fetch.delete(`/v1/admin/delete/${name}`)
      .then(() => this.$translate("TOAST.DELETE_ACCOUNT_SUCCESS", { name })
        .then(message => {
          this.$toast.show(message);
          this.getAccounts();
        }))
      .catch(() => this.$translate("TOAST.DELETE_ACCOUNT_FAIL", { name })
        .then(message => {
          this.$toast.show(message);
        }))
      .finally(() => {
        this.$mdDialog.cancel();
      })
  }

  resetDialog($event) {
    this.$mdDialog.show({
      controller: ResetPasswordController,
      controllerAs: 'reset',
      template: ResetPasswordTemplate,
      parent: element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
    });
  }

  closeResetDialog() {
    this.$mdDialog.cancel();
  }

  resetPassword(email, password) {
    this.$fetch.post('/v1/admin/reset', { email: email, password: password})
      .then(() => this.$translate("TOAST.RESET_SUCCESS", { email })
        .then(message => {
          this.$toast.show(message);
          this.getAccounts();
        }))
      .catch(() => this.$translate("TOAST.RESET_FAIL", { email })
        .then(message => {
          this.$toast.show(message);
        }))
      .finally(() => {
        this.$mdDialog.cancel();
      })
  }
}



