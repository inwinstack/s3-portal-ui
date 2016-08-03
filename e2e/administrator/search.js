const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Search Account and Role',() => {
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

  describe('When admin input incorrect account or role : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmail + '2');
    });
    it('Should check user list count is zero', () => {
      expect(ad.allAccountList.count()).toBe(0);
    });
  });

  describe('When admin input admin role : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys('admin');
    });
    it('Should check user list count is not zero', () => {
      expect(ad.allAccountList.count()).not.toBe(0);
    });
  });

  describe('When admin input incorrect account : ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.adminEmail);
    });
    it('Should check user list have this account and count is one', () => {
      expect(ad.allAccountList.count()).toBe(1);
      expect(ad.allAccountList.first().element(by.css('p[class="break-word flex-grow"]')).getText()).toBe(env.adminEmail);
    });
  });
});
