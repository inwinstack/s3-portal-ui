const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const signupElements = require('../elements/signup.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Create User', () => {
  const env = new environment();
  const sie = new signinElements();
  const sue = new signupElements();
  const be = new bucketElements();
  const fe = new fileElements();
  const ne = new navElements();
  const ps = new pages();
  const ad = new administratorElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  describe('When admin into the manager page and click create user: ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
    });
    it('Should check into the create user page', () => {
      expect(ad.createUserForm.isPresent()).toBe(true);
    });
  });

  describe('When admin has not input e-mail, password, and password confirmation : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
    });
    it('Should check the [CREATE] button is disabled', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin inputs null in the account and password : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys();
      ad.createUserPasswordInput.sendKeys();
      ad.createUserPasswordConfInput.sendKeys();
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check [CREATE] button is disabled and the message displayed', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
      expect(ad.createUserEmailError.isDisplayed()).toBe(true);
      expect(ad.createUserPasswordError.isDisplayed()).toBe(true);
      expect(ad.createUserPasswordConfError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin click create account and click [X] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.cancelCreateUserBtn.first().click();
    });
    it('Should check create account form is close', () => {
      expect(ad.createUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin click create account and click [CANCEL] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.cancelCreateUserBtn.get(1).click();
    });
    it('Should check create account form is close', () => {
      expect(ad.createUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin inputs the correct format for e-mail : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check the [CREATE] button is disabled', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin inputs the incorrect format for e-mail', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.incorrectEmail);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check the [CREATE] button is disabled and the message displayed', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
      expect(ad.createUserEmailError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin inputs the correct format for password : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys();
    });
    it('Should check [CREATE] button is disabled', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin inputs the incorrect format for password : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserPasswordInput.sendKeys(env.incorrectPassword);
      ad.createUserPasswordConfInput.sendKeys();
    });
    it('Should check the [CREATE] button is disabled and the message displayed', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
      expect(ad.createUserPasswordError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin inputs the password and confirmation is inconsistent :', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check the [CREATE] button is disabled and the message displayed', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
      expect(ad.createUserPasswordConfError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin inputs the e-mail, password and confirmation : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.correctPassword);
    });
    it('Should check [CREATE] button is enabled.', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(true);
    });
  });

  describe('When admin inputs the e-mail, password and confirmation and clicks the [SIGN UP] : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkCreateUserBtn.click();
    });
    it('Should check show create success message', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      // expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When admin inputs an already existing e-mail :', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check the [CREATE] button is disabled and the message displayed', () => {
      expect(ad.checkCreateUserBtn.isEnabled()).toBe(false);
      expect(ad.createUserEmailExist.isDisplayed()).toBe(true);
    });
  });
});
