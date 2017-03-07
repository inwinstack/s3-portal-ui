const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const administratorElements = require('../elements/administrator.js');
const pages = require('../page.js');

describe('User Quota',() => {
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
      sie.emailInput.sendKeys('root@inwinstack.com');
      sie.passwordInput.sendKeys('password');
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

  describe('When root wait view:', () => {
    beforeEach(() => {
      nae.menuBtn.first().click();
      ade.accountListBtn.click();
    });

    it(('Should check Wait icon'), () => {
      browser.ignoreSynchronization = true;
      expect(ade.loadingIcon.isPresent()).toBe(true);
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
      expect(ade.userMsg.first().getText()).toMatch(/^\(*\/*\)*.??%*/);
    });
  });
});
