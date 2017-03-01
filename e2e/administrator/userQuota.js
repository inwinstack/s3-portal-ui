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

//signIn
  describe('When user signIn and click user list:', () => {
    beforeEach(() => {
      sie.emailInput.sendKeys('root@imac.com');
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

  describe('When root check EN capacity item:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.userList.element(by.css('th[class="md-column ng-isolate-scope md-sort"]')).getText()).toBe("User Quota");
    });
  });

  describe('When root check TW capacity item:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.userList.element(by.css('th[class="md-column ng-isolate-scope md-sort"]')).getText()).toBe("使用者配額");
    });
  });

  describe('When root check CN capacity item:', () => {
    beforeEach(() => {
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it('Should check capacity item true', () => {
      expect(ade.userList.element(by.css('th[class="md-column ng-isolate-scope md-sort"]')).getText()).toBe("使用者配额");
    });
  });

  describe('When root wait view:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it(('Should check Wait icon'), () => {
      browser.ignoreSynchronization = true;
      expect(element(by.css('[class="ng-isolate-scope md-mode-indeterminate"]')).isPresent()).toBe(true);
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When root userList views', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
      ade.search.sendKeys("Titan@imac.com");
    });

    it(('Should check \% and total Quota'), () => {
      expect(ade.allAccountList.first().element(by.css('[class="ratio-width md-cell"]')).getText()).toBe("(0 bytes/48.83 MB)0.00%\nsettings");
    });
  });
});
