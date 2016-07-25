import { element } from 'angular';
import { sortByEmail } from '../../utils/sort';
import AccountCreateController from './create/create.controller';
import AccountCreateTemplate from './create/create.html';

/** @ngInject */
export default class ManagerService {
  constructor($toast, $mdDialog, $fetch) {
    Object.assign(this, {
      $toast, $mdDialog, $fetch,
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
        console.log(this.state.lists.data)
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
}



