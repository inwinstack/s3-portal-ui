const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Sign In',() => {
  const env = new environment();
  const sie = new signinElements();
  const ps = new pages();
  const ne = new navElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user into the website : ',() => {
    it('Should check into the sign in page',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(ps.signInPage);
      });
    });
  });

  describe('When user email and password has not been entered : ',() => {
    it('Should check the [SIGN IN] is disabled.',() => {
      expect(sie.signinBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user inputs null in the account and password : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys();
      sie.passwordInput.sendKeys();
      sie.emailInput.sendKeys();
    });
    it('Should check the [SIGN IN] is disabled and the message is displayed',() => {
      expect(sie.signinBtn.isEnabled()).not.toBe(true);
      expect(sie.emailInputError.isDisplayed()).toBe(true);
      expect(sie.passwordInputError.isDisplayed()).toBe(true);
    });
  });

  describe('When user only inputs the email : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys();
    });
    it('Should check the [SIGN IN] button is disabled.',() => {
      expect(sie.signinBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user only inputs the password : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys();
      sie.passwordInput.sendKeys('passwd');
    });
    it('Should check the [SIGN IN] button is disabled.',() => {
      expect(sie.signinBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When the user inputs the correct email and password, but the email does not exist : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail + '1');
      sie.passwordInput.sendKeys(env.correctPassword);
    });
    it('Should check the [SIGN IN] is enabled',() => {
      expect(sie.signinBtn.isEnabled()).toBe(true);
    });
  });

  describe('When the user inputs the correct email and password, but the email does not exist and clicks the [SIGN IN]: ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail + '1');
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check the status message is displayed',() => {
      expect(sie.signinStatus.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs exist email but input not match password : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.incorrectPassword);
    });
    it('Should check the [SIGN IN] is enabled',() => {
      expect(sie.signinBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user inputs exist email but input not match password and clicks  : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.incorrectPassword);
      sie.signinBtn.click();
    });
    it('Should check the status message is displayed',() => {
      expect(sie.signinStatus.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the correct email and password : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
    });
    it('Should check [SIGN IN] will enabled',() => {
      expect(sie.signinBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user input the correct email and password and click the [SIGN IN] : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check this website is go to bucket management page and show sign in success message',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
      browser.ignoreSynchronization = false;
    });
  });
});
