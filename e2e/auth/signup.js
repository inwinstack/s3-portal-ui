const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const signupElements = require('../elements/signup.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Sign up : ',() => {
  const env = new environment();
  const sie = new signinElements();
  const sue = new signupElements();
  const ps = new pages();
  const ne = new navElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user clicks the [Create an account] button : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
    });
    it('Should check whether to enter the sign up page',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(ps.signUpPage);
      });
    });
  });

  describe('When user has not input e-mail, password, and password confirmation : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
    });
    it('Should check the [SIGN UP] button is disabled',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user inputs null in the account and password : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys();
      sue.signupPasswordInput.sendKeys();
      sue.signupPasswordConfInput.sendKeys();
      sue.signupEmailInput.sendKeys();
    });
    it('Should check [SIGN UP] button is disabled and the message displayed',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
      expect(sue.signupEmailError.isDisplayed()).toBe(true);
      expect(sue.signupPasswordError.isDisplayed()).toBe(true);
      expect(sue.signupPasswordConfError.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the correct format for e-mail : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check the [SIGN UP] button is disabled',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user inputs the incorrect format for e-mail',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.incorrectEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check the [SIGN UP] button is disabled and the message displayed',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
      expect(sue.signupEmailError.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the correct format for password : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button is disabled',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user inputs the incorrect format for password : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.incorrectPassword);
      sue.signupPasswordConfInput.sendKeys();
    });
    it('Should check the [SIGN UP] button is disabled and the message displayed',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
      expect(sue.signupPasswordError.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the password and confirmation is inconsistent :',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.incorrectPassword);
      sue.signupEmailInput.sendKeys();
    });
    it('Should check the [SIGN UP] button is disabled and the message displayed',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
      expect(sue.signupPasswordConfError.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the e-mail, password and confirmation : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.correctPassword);
    });
    it('Should check [SIGN UP] button is enabled.',() => {
      expect(sue.checkSignUpBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user inputs the e-mail, password and confirmation and clicks the [SIGN UP] : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.correctPassword);
      sue.checkSignUpBtn.click();
    });
    it('Should check this website is go to signin page and show sign up success message',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(browser.getCurrentUrl()).toBe(ps.signInPage);
    });
  });

  describe('When user inputs an already existing e-mail :',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check the [SIGN UP] button is disabled and the message displayed',() => {
      expect(sue.checkSignUpBtn.isEnabled()).not.toBe(true);
      expect(sue.signupEmailExist.isDisplayed()).toBe(true);
    });
  });
});
