function elements () {
  this.emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  this.emailInputError = element(by.css('[ng-messages="signin.form.email.$error"]'));
  this.passwordInputError = element(by.css('[ng-messages="signin.form.password.$error"]'));
  this.passwordInput = element(by.css('[ng-model="signin.credentials.password"]'));
  this.signupBtn = element(by.css('[href="/auth/signup"]'));
  this.signinBtn = element(by.css('[ng-click="signin.submit()"]'));
  this.signinStatus = element(by.css('[ng-show="signin.incorrect"]'));
  this.loginToYourAccount = element.all(by.css('span[class="ng-scope"]')).get(1);
  this.haveNotAccount = element.all(by.css('span[class="ng-scope"]')).get(3);
}

module.exports = elements;
