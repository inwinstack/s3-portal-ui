const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Sign Out',() => {
  const env = new environment();
  const sie = new signinElements();
  const ne = new navElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user click the [Sign Out] : ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Should check back the sign in page and show sign out success message',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(browser.getCurrentUrl()).toBe(ps.signInPage);
    });
  });
});
