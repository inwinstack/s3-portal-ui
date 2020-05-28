var environment = require('../environment.js');
var traslate = require('../languages/index.js');

describe('Sign up : ',() => {
  const emailInput = element(by.css('[ng-model="signup.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signup.credentials.password"]'));
  const passwdConfInput = element(by.css('[ng-model="signup.credentials.password_confirmation"]'));
  const loginPageButton = element(by.css('[href="/auth/signup"]'));
  const signupButton = element(by.css('[ng-click="signup.submit()"]'));
  const emailMessage = element(by.css('[ng-messages="signup.form.email.$error"]'));
  const passwordMessage = element(by.css('[ng-messages="signup.form.password.$error"]'));
  const passwordConfMessage = element(by.css('[ng-messages="signup.form.password_confirmation.$error"]'));
  const emailExsitMessage = element(by.css('[ng-show="signup.emailIsInvalid && signup.showEmailCheckedMessage"]'));
  const successMessage = element(by.css('md-toast span[class="ng-binding flex"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user enter this website and click [Create an account] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
    });
    it('Should check the website will go to Sign-In page".',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signup');
      });
    });
  });

  describe('When user not input email 、 password and retype password : ',() => {
    beforeEach(() => {
     loginPageButton.click();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When user input null in email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys();
      passwdInput.sendKeys();
      passwdConfInput.sendKeys();
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check messages will displayed.',() => {
      expect(emailMessage.isDisplayed()).toBe(true);
      expect(passwordMessage.isDisplayed()).toBe(true);
      expect(passwdConfInput.isDisplayed()).toBe(true);
    });
  });

  describe('When user input correct format email : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will not displayed.',() => {
      expect(emailMessage.isDisplayed()).toBe(false);
    });
  });

  describe('When user input incorrect email',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getIncorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will Displayed.',() => {
      expect(emailMessage.isDisplayed()).toBe(true);
    });
  });

  describe('When user input correct format password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will not displayed.',() => {
      expect(passwordMessage.isDisplayed()).toBe(false);
    });
  });

  describe('When user input incorrect password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getIncorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will Displayed.',() => {
      expect(passwordMessage.isDisplayed()).toBe(true);
    });
  });

  describe('When user input password and retype password, but they don\'t match :',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getIncorrectPassword());
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will Displayed.',() => {
      expect(passwordConfMessage.isDisplayed()).toBe(true);
    });
  });

  describe('When user input correct email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will enabled.',() => {
      expect(signupButton.isEnabled()).toBe(true);
    });
    it('Should check message will not displayed.',() => {
      expect(emailMessage.isDisplayed()).not.toBe(true);
      expect(passwordMessage.isDisplayed()).not.toBe(true);
      expect(passwordConfMessage.isDisplayed()).not.toBe(true);
    });
  });

  describe('When user input all and click [SIGN UP] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
      signupButton.click();
    });
    it('Should check message will show message and the website will go to Sign-In page.',() => {
      expect(successMessage.isDisplayed()).toBe(true);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });

  describe('When user input exist email :',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled.',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will displayed.',() => {
      expect(emailExsitMessage.isDisplayed()).toBe(true);
    });
  });
});
