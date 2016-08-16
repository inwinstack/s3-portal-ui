const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Delete User', () => {
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

  describe('When admin into the manager page: ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
    });
    it('Should check the [DELETE ACCOUNT] button is disabled : ', () => {
      expect(ad.deleteUserBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin select one account : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.accountListCheckbox.first().click();
    });
    it('Should check the [DELETE ACCOUNT] button is enabled : ', () => {
      expect(ad.deleteUserBtn.isEnabled()).toBe(true);
    });
  });

  describe('When admin select over one account : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.accountListCheckbox.first().click();
      ad.accountListCheckbox.get(1).click();
    });
    it('Should check the [DELETE ACCOUNT] button is enabled : ', () => {
      expect(ad.deleteUserBtn.isEnabled()).toBe(false);
    });
  });

  describe('When admin click the [DELETE ACCOUNT] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
    });
    it('Should check into the delete account page : ', () => {
      expect(ad.deleteUserForm.isPresent()).toBe(true);
    });
  });

  describe('When admin click [DELETE ACCOUNT] button and click [X] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.cancelDeleteUserBtn.first().click();
    });
    it('Should check delete account form is close', () => {
      expect(ad.deleteUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin click [DELETE ACCOUNT] button and click [CANCEL] button : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.cancelDeleteUserBtn.get(1).click();
    });
    it('Should check delete account form is close', () => {
      expect(ad.deleteUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin input null e-mail : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys();
      ad.checkDeleteUserBtn.click();
    });
    it('Should check the [DELETE] button is disabled and the message displayed : ', () => {
      expect(ad.checkDeleteUserBtn.isEnabled()).toBe(false);
      expect(ad.deleteUserEmailError.isDisplayed()).toBe(true);
    });
  });

  describe('When admin input incorrect e-mail : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.incorrectEmail);
    });
    it('Should check the [DELETE] button is disabled and the message displayed : ', () => {
      expect(ad.checkDeleteUserBtn.isEnabled()).toBe(false);
      expect(ad.deleteUserEmailNonexistent.isDisplayed()).toBe(true);
    });
  });

  describe('When admin input correct e-mail : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmailCreate);
    });
    it('Should check the [DELETE] button is enabled : ', () => {
      expect(ad.checkDeleteUserBtn.isEnabled()).toBe(true);
    });
  });

  describe('When admin input correct e-mail : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check the [DELETE] button is enabled : ', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });
});
