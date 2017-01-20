var environment = require('../globel_env.js');

describe('Sign up : ',() => {
  const emailInput = element(by.css('[ng-model="signup.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signup.credentials.password"]'));
  const passwdConfInput = element(by.css('[ng-model="signup.credentials.password_confirmation"]'));
  const loginPageButton = element(by.css('[href="/auth/signup"]'));
  const signupButton = element(by.css('[ng-click="signup.submit()"]'));
  const emailMessage = element(by.css('[ng-messages="signup.form.email.$error"]'));
  const passwordMessage = element(by.css('[ng-messages="signup.form.password.$error"]'));
  const passwordConfMessage = element(by.css('[ng-messages="signup.form.password_confirmation.$error"]'));
  const successMessage = element(by.css('[class="ng-binding flex"]'));
  const emailExsitMessage = element(by.css('[ng-show="signup.emailIsInvalid && signup.showEmailCheckedMessage"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When users enter this website and click [Create an account] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
    });
    it('Should check title will show \"Create an account\".',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signup');
      });
    });
  });

  describe('When users not input email 、 password and retype password : ',() => {
    beforeEach(() => {
     loginPageButton.click();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When users input null in email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys();
      passwdInput.sendKeys();
      passwdConfInput.sendKeys();
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"You left the field blank.\"',() => {
      expect(emailMessage.isDisplayed()).toBe(true);
      emailMessage.getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      expect(passwordMessage.isDisplayed()).toBe(true);
      passwordMessage.getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      expect(passwordConfMessage.isDisplayed()).toBe(true);
      passwordConfMessage.getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
    });
  });

  describe('When users input correct format email : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check not any messages',() => {
      expect(emailMessage.isDisplayed()).not.toBe(true);
    });
  });

  describe('When users input incorrect email',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getIncorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"Your email must be look like an e-mail address.\"',() => {
      expect(emailMessage.isDisplayed()).toBe(true);
      emailMessage.getText().then((result) => {
        expect(result).toBe('Your email must be look like an e-mail address.');
      });
    });
  });

  describe('When users input correct format password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When users input incorrect password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getIncorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"Please enter at least 6 characters.\"',() => {
      expect(passwordMessage.isDisplayed()).toBe(true);
      passwordMessage.getText().then((result) => {
        expect(result).toBe('Please enter at least 6 characters.');
      });
    });
  });

  describe('When users input password and retype password, but they do not match :',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getIncorrectPassword());
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"Please enter the same value again.\"',() => {
      expect(passwordConfMessage.isDisplayed()).toBe(true);
      passwordConfMessage.getText().then((result) => {
        expect(result).toBe('Please enter the same value again.');
      });
    });
  });

  describe('When users input correct email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will enabled',() => {
      expect(signupButton.isEnabled()).toBe(true);
    });
    it('Should check not any messages',() => {
      expect(emailMessage.isDisplayed()).not.toBe(true);
      expect(passwordMessage.isDisplayed()).not.toBe(true);
      expect(passwordConfMessage.isDisplayed()).not.toBe(true);
    });
  });

  describe('When users input all and click [SIGN UP] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
      signupButton.click();
    });
    it('Should check message will show \"Sign Up Success!\" and goto signin page',() => {
      successMessage.getText().then((result) => {
        expect(result).toBe('Sign Up Success!');
      });
      browser.sleep(10000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });

  describe('When users input exist email :',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"Someone already has that username. Try another?\"',() => {
      expect(emailExsitMessage.isDisplayed()).toBe(true);
      emailExsitMessage.getText().then((result) => {
        expect(result).toBe('Someone already has that username. Try another?');
      });
    });
  });
});
