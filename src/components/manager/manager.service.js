import { element } from 'angular';
import { sortByName } from '../../utils/sort';

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
    // this.state.lists.requesting = true;
    this.state.lists.data = [];
    const data = {
            "Users": [
              {
                "id": 1,
                "uid": "a@a.a",
                "name": "a@a.a",
                "role": "user",
                "email": "a@a.a",
                "access_key": "23QIQSCDOZCDXLR72PK0",
                "secret_key": "D2rk4NUddvBQQlO33DVZKnh4E32OrjTFUqIds5b7",
                "created_at": "2016-07-11 03:37:56",
                "updated_at": "2016-07-11 03:37:56"
              },
              {
                "id": 2,
                "uid": "b@bb.b",
                "name": "b@bb.b",
                "role": "user",
                "email": "b@bb.b",
                "access_key": "H6FDWAJPGZ9HDUG596HS",
                "secret_key": "T2ZAGIfrKZhVq8X8hOHpcGLdZLCFJINJk9VYZWOE",
                "created_at": "2016-07-11 03:45:44",
                "updated_at": "2016-07-11 03:45:44"
              },
              {
                "id": 3,
                "uid": "chaoen@inwinstack.com",
                "name": "chaoen@inwinstack.com",
                "role": "user",
                "email": "chaoen@inwinstack.com",
                "access_key": "0ERTXAIEMEN25C5R1687",
                "secret_key": "xtTdlGQNgjt1pSjFLiNtB54qbpI2lMxXMpYf3jgf",
                "created_at": "2016-07-14 01:29:35",
                "updated_at": "2016-07-14 01:29:35"
              },
              {
                "id": 4,
                "uid": "root@inwinstack.com",
                "name": "root@inwinstack.com",
                "role": "admin",
                "email": "root@inwinstack.com",
                "access_key": "B0QZ7AWJGT1A4P82AWJR",
                "secret_key": "cD53SakMgpCCLJJFRNDEs56yP2R2vVS8shN5mHqP",
                "created_at": "2016-07-18 08:06:01",
                "updated_at": "2016-07-18 08:06:01"
              },
              {
                "id": 5,
                "uid": "x@a.a",
                "name": "x@a.a",
                "role": "user",
                "email": "x@a.a",
                "access_key": "2CN76IH69O7I0F3D36BX",
                "secret_key": "isjnwPRPVvhrCSuPEjpH5tEMJPCglAP7olmaXR41",
                "created_at": "2016-07-18 08:22:12",
                "updated_at": "2016-07-18 08:22:12"
              },
              {
                "id": 6,
                "uid": "ubuntu-chrome@inwinstack.com",
                "name": "ubuntu-chrome@inwinstack.com",
                "role": "user",
                "email": "ubuntu-chrome@inwinstack.com",
                "access_key": "0EVABF6V9R8YE1UN280H",
                "secret_key": "Poy3MD8mFF0lXuyh1QSiw2oxDuPxo9YPMtwO4smB",
                "created_at": "2016-07-18 13:57:15",
                "updated_at": "2016-07-18 13:57:15"
              },
              {
                "id": 7,
                "uid": "ubuntu-chrome@inwinstack.com1",
                "name": "ubuntu-chrome@inwinstack.com1",
                "role": "user",
                "email": "ubuntu-chrome@inwinstack.com1",
                "access_key": "02YNUWK2T22P2673HG1X",
                "secret_key": "AsOGgqLyv14iawBilqTLgNHdpN23ovFheyPw0OOD",
                "created_at": "2016-07-18 13:57:55",
                "updated_at": "2016-07-18 13:57:55"
              },
              {
                "id": 8,
                "uid": "ubuntu-chrome@inwinstack.com3",
                "name": "ubuntu-chrome@inwinstack.com3",
                "role": "user",
                "email": "ubuntu-chrome@inwinstack.com3",
                "access_key": "04XDQ4X1AKZ4B1LYM6SL",
                "secret_key": "uiO9tf1szmGcBsBJzwIeSbRz6qcVAS5FIBJ3S951",
                "created_at": "2016-07-18 13:58:26",
                "updated_at": "2016-07-18 13:58:26"
              },
              {
                "id": 9,
                "uid": "ubuntu-chrome@inwinstack.com5",
                "name": "ubuntu-chrome@inwinstack.com5",
                "role": "user",
                "email": "ubuntu-chrome@inwinstack.com5",
                "access_key": "0YUD6RY9URHCK3RW6ZL8",
                "secret_key": "A9TuQmLdyWkTZYGlCNXjDTAZmaQqYYZiszw3BXTf",
                "created_at": "2016-07-18 13:58:55",
                "updated_at": "2016-07-18 13:58:55"
              }
            ]
          }
    const users = data.Users.map(account => ({
      ...account,
      checked: false,
    }));
    this.state.lists.data = users.sort(sortByName);
    this.state.lists.error = false;

    // this.$fetch.post('/v1/admin/list')
    //   .then(({ data }) => {
    //     this.state.lists.error = false;
    //     const users = data.Users.map(account => ({
    //       ...account,
    //       checked: false,
    //     }));
    //     this.state.lists.data = users.sort(sortByName);
    //     console.log(this.state.lists.data)
    //   })
    //   .catch(() => {
    //     this.state.lists.error = true;
    //   })
    //   .finally(() => {
    //     this.state.lists.requesting = false;
    //   });

  }


  selectAccount(id) {
    this.state.lists.data = this.state.lists.data.map(user => {
      let checked = user.checked;

      if (id === user.id) checked = ! checked;

      return { ...user, checked };
    });
  }
}



