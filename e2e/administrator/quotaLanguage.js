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
  describe('When root check [User List] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
    });

    it(('Should check Wait icon'), () => {
      expect(ade.accountListBtn.getText()).toBe(translate('en','UTILS_QUOTA'));
    });
  });

  describe('When root check [User Quota] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item using the right language', () => {
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

  describe('When root change User Quota and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.first().click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys(evn.correctEmail);
      ade.setQuota.first().click();
      ade.quotaSize.clear();
      ade.quotaSize.sendKeys("6");
      ade.setQuotaSave.click();
    });

    it('Should check toast and selects the English language:', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(3000);
      expect(nae.toastMessage.getText()).toBe(translate('en','TOAST_QUOTA_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  //TW
  describe('When root check [User List] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
    });

    it(('Should check Wait icon'), () => {
      expect(ade.accountListBtn.getText()).toBe(translate('tw','UTILS_QUOTA'));
    });
  });

  describe('When root check [User Quota] and selects the Traditional Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item using the right language', () => {
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

  describe('When root change User Quota and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys(evn.correctEmail);
      ade.setQuota.first().click();
      ade.quotaSize.clear();
      ade.quotaSize.sendKeys("6");
      ade.setQuotaSave.click();
    });

    it('Should check toast and selects the English language:', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(3000);
      expect(nae.toastMessage.getText()).toBe(translate('tw','TOAST_QUOTA_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  //CN
  describe('When root check [User List] and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
    });

    it(('Should check Wait icon'), () => {
      expect(ade.accountListBtn.getText()).toBe(translate('cn','UTILS_QUOTA'));
    });
  });

  describe('When root check [User Quota] and selects the Simplified Chinese language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item using the right language', () => {
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

  describe('When root change User Quota and selects the English language:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys(evn.correctEmail);
      ade.setQuota.first().click();
      ade.quotaSize.clear();
      ade.quotaSize.sendKeys("6");
      ade.setQuotaSave.click();
    });

    it('Should check toast and selects the English language:', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(3000);
      expect(nae.toastMessage.getText()).toBe(translate('cn','TOAST_QUOTA_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });
});
