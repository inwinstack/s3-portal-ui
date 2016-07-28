function elements () {
  this.accountListBtn = element(by.css('[aria-label="Account List"]'));
  this.bucketListBtn = element(by.css('[aria-label="Bucket"]'));
  this.userList = element(by.css('[ng-if="list.data.length && ! list.requesting && ! list.error"]'));
  this.createUserBtn = element(by.css('[ng-click="managerNav.createAccountDialog($event)"]'));
  this.deleteUserBtn = element(by.css('[ng-click="managerNav.delete()"]'));
  this.resetUserPassword = element(by.css('[ng-click="managerNav.reset()"]'));
  this.serachUser = element(by.name('searchText'));
  this.createUserForm = element(by.name('create.form'));
  this.createUserTitle = element(by.css('h2[class="ng-scope"]'));
  this.createUserEmailInput = element(by.name('email'));
  this.createUserEmailError = element(by.css('[ng-messages="create.form.email.$error"]'));
  this.createUserPasswordInput = element(by.name('password'));
  this.createUserPasswordError = element(by.css('[ng-messages="create.form.password.$error"]'));
  this.createUserPasswordConfInput = element(by.name('password_confirmation'));
  this.createUserPasswordConfError = element(by.css('[ng-messages="create.form.password_confirmation.$error"]'));
  this.createUserEmailExist = element(by.css('[ng-show="create.emailIsInvalid && create.showEmailCheckedMessage"]'));
  this.checkCreateUserBtn = element(by.css('[ng-click="create.submit()"]'));
  this.cancelCreateUserBtn = element.all(by.css('[ng-click="create.cancel()"]'));
}

module.exports = elements;
