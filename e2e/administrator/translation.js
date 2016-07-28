const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const naturalSort = require('javascript-natural-sort');
const folderElements = require('../elements/folder.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');

describe('User List Translation',() => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const ps = new pages();
  const ne = new navElements();
  const foe = new folderElements();
  const ad = new administratorElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  // TW
  describe('When user into the manage page and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.accountListBtn.getText()).toBe(translate('tw', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.createUserBtn.getText()).toBe(translate('tw', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('tw', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('tw', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('tw', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  // CN
  describe('When user into the manage page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.accountListBtn.getText()).toBe(translate('cn', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.createUserBtn.getText()).toBe(translate('cn', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('cn', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('cn', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('cn', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  // EN
  describe('When user into the manage page and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.accountListBtn.getText()).toBe(translate('en', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.createUserBtn.getText()).toBe(translate('en', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('en', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('en', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('en', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  describe('When admin click the [Sign Out] : ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Clear',() => {});
  });
});
