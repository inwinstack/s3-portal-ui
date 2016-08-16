const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('User List',() => {
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

  describe('When user signIn with administrator and click user list: ', () => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.adminEmail);
      sie.passwordInput.sendKeys(env.adminPassword);
      sie.signinBtn.click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
    });
    it('Should check into the user list page', () => {
      expect(browser.getCurrentUrl()).toBe(ps.accountListPage);
      expect(ad.userList.isPresent()).toBe(true);
      expect(ad.createUserBtn.isPresent()).toBe(true);
      expect(ad.createUserBtn.isEnabled()).toBe(true);
      expect(ad.deleteUserBtn.isPresent()).toBe(true);
      expect(ad.deleteUserBtn.isEnabled()).toBe(false);
      expect(ad.resetUserPasswordBtn.isPresent()).toBe(true);
      expect(ad.resetUserPasswordBtn.isEnabled()).toBe(false);
      expect(ad.searchUser.isPresent()).toBe(true);
    });
  });

  describe('When user clicks the bucket list : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.bucketListBtn.click();
    });
    it('Should check back the bucket page', () => {
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
    });
  });

});
