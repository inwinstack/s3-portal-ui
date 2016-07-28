function elements () {
  this.accountListBtn = element(by.css('[aria-label="Account List"]'));
  this.bucketListBtn = element(by.css('[aria-label="Bucket"]'));
  this.userList = element(by.css('[ng-if="list.data.length && ! list.requesting && ! list.error"]'));
  this.allAccountList = element.all(by.repeater('f in list.data | filter:list.searchText'));
  this.accountListCheckbox = element.all(by.css('[ng-checked="f.checked"]'));
  this.createUserBtn = element(by.css('[ng-click="managerNav.createAccountDialog($event)"]'));
  this.deleteUserBtn = element(by.css('[ng-click="managerNav.delete()"]'));
  this.resetUserPasswordBtn = element(by.css('[ng-click="managerNav.reset()"]'));
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
  this.resetPasswordForm = element(by.name('reset.form'));
  this.ResetPasswordPasswordInput = element(by.name('password'));
  this.ResetPasswordPasswordError = element(by.css('[ng-messages="reset.form.password.$error"]'));
  this.ResetPasswordPasswordConfInput = element(by.name('password_confirmation'));
  this.ResetPasswordPasswordConfError = element(by.css('[ng-messages="reset.form.password_confirmation.$error"]'));
  this.cancelResetPasswordBtn = element(by.css('[ng-click="reset.cancel()"]'));
  this.checkResetPasswordBtn = element(by.css('[ng-click="reset.submit()"]'));
}

module.exports = elements;
