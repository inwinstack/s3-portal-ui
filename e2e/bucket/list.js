const environment = require('../environment/index.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const naturalSort = require('javascript-natural-sort');
const pages = require('../page.js');

describe('Bucket List : ',() => {
  const env = new environment();
  const be = new bucketElements();
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

  describe('When the user into the management bucket page but do not have any of the bucket : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check the [CREATE BUCKET] button is display and enabled and the message is displayed',() => {
      expect(be.createBucket.isPresent()).toBe(true);
      expect(be.createBucket.isEnabled()).toBe(true);
      expect(be.noBucketTitle.isPresent()).toBe(true);
      expect(be.noBucketSubtitle.isPresent()).toBe(true);
    });
  });
});
