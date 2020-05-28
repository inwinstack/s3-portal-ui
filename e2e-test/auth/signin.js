var environment = require('../environment.js');
var traslate = require('../languages/index.js');

describe('Sign in',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user enter this website : ',() => {
    it('Should check the website will go to Sign-In page.',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });

  describe('When user not input email and password : ',() => {
    it('Should check [SIGN IN] will disabled.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When user input null in email and password : ',() => {
    beforeEach(() => {
      emailInput.sendKeys();
      passwdInput.sendKeys();
      emailInput.sendKeys();
    });
    it('Should check [SIGN IN] will disabled and message will displayed.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will displayed.',() => {
      expect(element(by.css('div[ng-messages="signin.form.email.$error"] div[ng-message="required"]')).isDisplayed()).toBe(true);
      expect(element(by.css('div[ng-messages="signin.form.password.$error"] div[ng-message="required"]')).isDisplayed()).toBe(true);
    });
  });

  describe('When user input incorrect format email : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getIncorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN IN] button will disabled.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will displayed.',() => {
      expect(element(by.css('div[ng-messages="signin.form.email.$error"] div[ng-message="email"]')).isDisplayed()).toBe(true);
    });
  });

  describe('When user input correct format but this email is not exist : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getIncorrectEmail()+'@gmail.com');
      passwdInput.sendKeys('passwd');
      signinButton.click();
    });
    it('Should check [SIGN IN] will enabled and message will displayed.',() => {
      expect(signinButton.isEnabled()).toBe(true);
    });
    it('Should check message will displayed.',() => {
      element(by.css('div[ng-show="signin.incorrect"]')).getAttribute('aria-hidden').then((attr) => {
        expect(attr).toBe('false');
      });
    });
  });

  describe('When user input exist email but input not match password : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getIncorrectPassword());
      signinButton.click();
    });
    it('Should check message will displayed.',() => {
      element(by.css('div[ng-show="signin.incorrect"]')).getAttribute('aria-hidden').then((attr) => {
        expect(attr).toBe('false');
      });
    });
  });

  describe('When user input correct email and password : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
    });
    it('Should check [SIGN IN] will enabled and.',() => {
      expect(signinButton.isEnabled()).toBe(true);
    });
  });

  describe('When user input all and click [SIGN IN] : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
    });
    it('Check message will displayed and go to Bucket List page',() => {
      expect(element(by.css('md-toast')).isDisplayed()).toBe(true);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/bucket');
      });
    });
  });
});