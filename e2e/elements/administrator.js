function elements () {
  this.accountListBtn = element(by.css('[aria-label="Account List"]'));
  this.bucketListBtn = element(by.css('[aria-label="Bucket"]'));
  this.userList = element(by.css('[ng-if="list.data.length && ! list.requesting && ! list.error"]'));
  this.createUserBtn = element(by.css('[ng-click="managerNav.createAccountDialog($event)"]'));
  this.deleteUserBtn = element(by.css('[ng-click="managerNav.delete()"]'));
  this.resetUserPassword = element(by.css('[ng-click="managerNav.reset()"]'));
  this.serachUser = element(by.name('searchText'));
}

module.exports = elements;
