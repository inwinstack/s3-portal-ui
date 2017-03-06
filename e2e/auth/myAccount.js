const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const accountElements = require('../elements/account.js');
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

//signIn
  describe('When user signIn and click user list:', () => {
    beforeEach(() => {
      sie.emailInput.sendKeys('Titan@imac.com');
      sie.passwordInput.sendKeys('123456');
      sie.signinBtn.click();
    });

    it('Should cheak into the user list page', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click setBtn [My Account]:', () => {
    beforeEach(() => {
      nae.menuBtn.get(0).click();
      nae.myAccountBtn.click();
    });

    it('Should show My Account page', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(ps.myAccountPage);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click [My Account] check loadingIcon:', () => {
    beforeEach(() => {
      nae.menuBtn.get(0).click();
      nae.myAccountBtn.click();
    });

    it('Should show loadingIcon', () => {
      browser.ignoreSynchronization = true;
      expect(ace.loadingIcon.isPresent()).toBe(true);
      browser.sleep(3000);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user check Pie chart and %:', () => {
    beforeEach(() => {
      nae.menuBtn.get(0).click();
      nae.myAccountBtn.click();
    });

    it('Should show Pie chart', () => {
      expect(ace.pieChart.isPresent()).toBe(true);
      expect(ace.pieChart.getText()).toBe("100%");
    });
  });

  describe('When user check [confirm] isEnabled:', () => {
    beforeEach(() => {
      nae.menuBtn.get(0).click();
      nae.myAccountBtn.click();
    });

    it('Should confirm isEnabled', () => {
      browser.ignoreSynchronization = true;
      expect(ace.confirmBtn.isEnabled()).toBe(true);
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click [confirm] change page:', () => {
    beforeEach(() => {
      nae.menuBtn.get(0).click();
      nae.myAccountBtn.click();
      ace.confirmBtn.click();
    });

    it('Should change page', () => {
      browser.ignoreSynchronization = true;
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    });
  });
});
