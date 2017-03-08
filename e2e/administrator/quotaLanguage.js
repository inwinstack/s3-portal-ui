const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const administratorElements = require('../elements/administrator.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Quota Translation',() => {
  const evn = new environment();
  const nae = new navElements();
  const sie = new signinElements();
  const bue = new bucketElements();
  const ade = new administratorElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    evn.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  //EN
  describe('When root check [User Quota] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.quotaTitle.getText()).toBe(translate('en','QUOTA_TITLE'));
    });
  });

  describe('When root click set [User Quota] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
    });

    it('Should check setQuota Form elements using the right language', () => {
      expect(ade.quotaFormTitle.getText()).toBe(translate('en','QUOTA_FORM_TITLE'));
      expect(ade.quotaFormLabel.first().getText()).toBe(translate('en','QUOTA_FORM_LABLE0'));
      expect(ade.quotaFormLabel.get(1).getText()).toBe(translate('en','QUOTA_FORM_LABLE1'));
      expect(ade.setQuotaCancel.get(1).getText()).toBe(translate('en','QUOTA_FORM_CANCEL'));
      expect(ade.setQuotaSave.getText()).toBe(translate('en','QUOTA_FORM_SAVE'));
    });
  });

  //TW
  describe('When root check [User Quota] and selects the Traditional Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.quotaTitle.getText()).toBe(translate('tw','QUOTA_TITLE'));
    });
  });

  describe('When root click set [User Quota] and selects the Traditional Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
    });

    it('Should check setQuota Form elements using the right language', () => {
      expect(ade.quotaFormTitle.getText()).toBe(translate('tw','QUOTA_FORM_TITLE'));
      expect(ade.quotaFormLabel.first().getText()).toBe(translate('tw','QUOTA_FORM_LABLE0'));
      expect(ade.quotaFormLabel.get(1).getText()).toBe(translate('tw','QUOTA_FORM_LABLE1'));
      expect(ade.setQuotaCancel.get(1).getText()).toBe(translate('tw','QUOTA_FORM_CANCEL'));
      expect(ade.setQuotaSave.getText()).toBe(translate('tw','QUOTA_FORM_SAVE'));
    });
  });

  //CN
  describe('When root check [User Quota] and selects the Simplified Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.quotaTitle.getText()).toBe(translate('cn','QUOTA_TITLE'));
    });
  });

  describe('When root click set [User Quota] and selects the Simplified Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
    });

    it('Should check setQuota Form elements using the right language', () => {
      expect(ade.quotaFormTitle.getText()).toBe(translate('cn','QUOTA_FORM_TITLE'));
      expect(ade.quotaFormLabel.first().getText()).toBe(translate('cn','QUOTA_FORM_LABLE0'));
      expect(ade.quotaFormLabel.get(1).getText()).toBe(translate('cn','QUOTA_FORM_LABLE1'));
      expect(ade.setQuotaCancel.get(1).getText()).toBe(translate('cn','QUOTA_FORM_CANCEL'));
      expect(ade.setQuotaSave.getText()).toBe(translate('cn','QUOTA_FORM_SAVE'));
    });
  });
});
