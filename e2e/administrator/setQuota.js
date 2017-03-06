const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const administratorElements = require('../elements/administrator.js');
const pages = require('../page.js');

describe('File Move',() => {
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

  describe('When root check setQuota button isDisplayed:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.setQuota.first().isDisplayed()).toBe(true);
    });
  });

  describe('When root click setQuota button form isPresent:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
    });

    it('Should check capacity item true', () => {
      expect(ade.setQuotaForm.isPresent()).toBe(true);
    });
  });

  describe('When root setQuotaForm click [X] close form:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
      ade.setQuotaCancel.first().click();
    });

    it('Should close setQuotaForm', () => {
      expect(ade.setQuotaForm.isPresent()).toBe(false);
    });
  });

  describe('When root setQuotaForm click [CANCEL] close form:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.setQuota.first().click();
      ade.setQuotaCancel.get(1).click();
    });

    it('Should closs setQuotaForm', () => {
      expect(ade.setQuotaForm.isPresent()).toBe(false);
    });
  });

  describe('When root change User Quota:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys("Titan@imac.com");
      ade.setQuota.first().click();
      ade.quotaSize.clear();
      ade.quotaSize.sendKeys("10");
      ade.setQuotaSave.click();
    });

    it('Should User Quota change', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When root check User Quota value:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys("Titan@imac.com");
    });

    it(('Should check total Quota 10GB'), () => {
      expect(ade.userMsg.first().getText()).toMatch(/\(*\/10.00\sGB\)*.??%*/);
    });
  });

  describe('When root change User Quota:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys("Titan@imac.com");
      ade.setQuota.first().click();
      ade.quotaSize.clear();
      ade.quotaSize.sendKeys("6");
      ade.setQuotaSave.click();
    });

    it('Should User Quota change', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });
});
