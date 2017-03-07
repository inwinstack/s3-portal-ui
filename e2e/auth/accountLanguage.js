const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const accountElements = require('../elements/account.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('My Account',() => {
  const evn = new environment();
  const nae = new navElements();
  const sie = new signinElements();
  const bue = new bucketElements();
  const ace = new accountElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    evn.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  //EN
  describe('When user check [My Account] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
    });

    it('Should check [My Account] using the right language', () => {
      expect(nae.myAccountBtn.getText()).toBe(translate('en','UTILS_ACCOUNT'));
    });
  });

  describe('When user click [My Account] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
      nae.myAccountBtn.click();
    });

    it('Should check [My Account] page elements using the right language', () => {
      expect(ace.accountTitle.getText()).toBe(translate('en','ACCOUNT_TITLE'));
      expect(ace.accountTotal.getText()).toBe(translate('en','ACOOUNT_TOTAL'));
      expect(ace.accountRemain.getText()).toBe(translate('en','ACCOUNT_REMAIN'));
      expect(ace.accountTagRemain.getText()).toBe(translate('en','ACCOUNT_TAG_REMAIN'));
      expect(ace.accountTagUsed.getText()).toBe(translate('en','ACCOUNT_TAG_USED'));
      expect(ace.accountDisplay.getText()).toBe(translate('en','ACCOUNT_DISPLAY'));
      expect(ace.accountConfirm.getText()).toBe(translate('en','ACCOUNT_CONFIRM'));
    });
  });

  //TW
  describe('When user check [My Account] and selects the Traditional Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
    });

    it('Should check [My Account] using the right language', () => {
      expect(nae.myAccountBtn.getText()).toBe(translate('tw','UTILS_ACCOUNT'));
    });
  });

  describe('When user click [My Account] and selects the Traditional Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      nae.myAccountBtn.click();
    });

    it('Should check [My Account] page elements using the right language', () => {
      expect(ace.accountTitle.getText()).toBe(translate('tw','ACCOUNT_TITLE'));
      expect(ace.accountTotal.getText()).toBe(translate('tw','ACOOUNT_TOTAL'));
      expect(ace.accountRemain.getText()).toBe(translate('tw','ACCOUNT_REMAIN'));
      expect(ace.accountTagRemain.getText()).toBe(translate('tw','ACCOUNT_TAG_REMAIN'));
      expect(ace.accountTagUsed.getText()).toBe(translate('tw','ACCOUNT_TAG_USED'));
      expect(ace.accountDisplay.getText()).toBe(translate('tw','ACCOUNT_DISPLAY'));
      expect(ace.accountConfirm.getText()).toBe(translate('tw','ACCOUNT_CONFIRM'));
    });
  });

  //CN
  describe('When user check [My Account] and selects the Simplified Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
    });

    it('Should check [My Account] using the right language', () => {
      expect(nae.myAccountBtn.getText()).toBe(translate('cn','UTILS_ACCOUNT'));
    });
  });

  describe('When user click [My Account] and selects the Simplified Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      nae.myAccountBtn.click();
    });

    it('Should check [My Account] page elements using the right language', () => {
      expect(ace.accountTitle.getText()).toBe(translate('cn','ACCOUNT_TITLE'));
      expect(ace.accountTotal.getText()).toBe(translate('cn','ACOOUNT_TOTAL'));
      expect(ace.accountRemain.getText()).toBe(translate('cn','ACCOUNT_REMAIN'));
      expect(ace.accountTagRemain.getText()).toBe(translate('cn','ACCOUNT_TAG_REMAIN'));
      expect(ace.accountTagUsed.getText()).toBe(translate('cn','ACCOUNT_TAG_USED'));
      expect(ace.accountDisplay.getText()).toBe(translate('cn','ACCOUNT_DISPLAY'));
      expect(ace.accountConfirm.getText()).toBe(translate('cn','ACCOUNT_CONFIRM'));
    });
  });
});
