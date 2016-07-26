function elements () {
  this.backSignin = element(by.css('[href="/auth/signin"]'));
  this.checkSignUpBtn = element(by.css('[ng-click="signup.submit()"]'));
  this.signupEmailInput = element(by.name('email'));
  this.signupEmailError = element(by.css('[ng-messages="signup.form.email.$error"]'));
  this.signupPasswordInput = element(by.name('password'));
  this.signupPasswordError = element(by.css('[ng-messages="signup.form.password.$error"]'));
  this.signupPasswordConfInput = element(by.name('password_confirmation'));
  this.signupPasswordConfError = element(by.css('[ng-messages="signup.form.password_confirmation.$error"]'));
  this.signupEmailExist = element(by.css('[ng-show="signup.emailIsInvalid && signup.showEmailCheckedMessage"]'));
  this.createAccount = element.all(by.css('span[class="ng-scope"]')).get(1);
  this.haveAccount = element.all(by.css('span[class="ng-scope"]')).get(3);
}

module.exports = elements;
