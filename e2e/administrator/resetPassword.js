const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Reset Password', () => {
  const env = new environment();
  const sie = new signinElements();
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

  describe('When admin not select account : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
    });
    it('Should check the [RESET PASSWORD] button is disabled', () => {
      expect(ad.resetUserPasswordBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin select account : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
    });
    it('Should check the [RESET PASSWORD] button is enabled', () => {
      expect(ad.resetUserPasswordBtn.isEnabled()).toBe(true);
    });
  });

  describe('When admin select account and click [RESET PASSWORD] button: ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
    });
    it('Should check into the reset password form ', () => {
      expect(ad.resetPasswordForm.isPresent()).toBe(true);
    });
  });

  describe('When admin click [RESET PASSWORD] button and click [X] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.cancelResetPasswordBtn.first().click();
    });
    it('Should check reset password form is close', () => {
      expect(ad.resetPasswordForm.isPresent()).toBe(false);
    });
  });

  describe('When admin click [RESET PASSWORD] button and click [CANCEL] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.cancelResetPasswordBtn.get(1).click();
    });
    it('Should check reset password form is close', () => {
      expect(ad.resetPasswordForm.isPresent()).toBe(false);
    });
  });

  describe('When admin not inputs password and password confirmation : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
    });
    it('Should check the [RESET] button is disabled', () => {
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin not input password and password confirmation : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys();
      ad.ResetPasswordPasswordConfInput.sendKeys();
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check the [RESET] button is disabled and the message displayed ', () => {
      expect(ad.ResetPasswordPasswordError.isDisplayed()).toBe(true);
      expect(ad.ResetPasswordPasswordConfError.isDisplayed()).toBe(true);
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin inputs the correct format for password : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys();
    });
    it('Should check [RESET] button is disabled', () => {
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin inputs the incorrect format for password : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys();
    });
    it('Should check the [RESET] button is disabled and the message displayed', () => {
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(false);
      expect(ad.ResetPasswordPasswordError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin inputs the password and confirmation is inconsistent :',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check the [RESET] button is disabled and the message displayed',() => {
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(false);
      expect(ad.ResetPasswordPasswordConfError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin inputs the password and confirmation : ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.correctPassword);
    });
    it('Should check [RESET] button is enabled.',() => {
      expect(ad.checkResetPasswordBtn.isEnabled()).toBe(true);
    });
  });

  describe('When admin inputs the password and confirmation and clicks the [SIGN UP] : ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkResetPasswordBtn.click();
    });
    it('Should check show reset password success message',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });
});
