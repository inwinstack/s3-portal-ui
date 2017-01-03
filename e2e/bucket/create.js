const environment = require('../environment/index.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Create Bucket',() => {
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

  describe('When user click the [CREATE BUCKET] button : ',() => {
    it('Should check the display Bucket form',() => {
      be.createBucketBtn.click();
      expect(be.bucketForm.isDisplayed()).toBe(true);
    });
    it('Should check the display Bucket form #2',() => {
      ne.menuBtn.get(2).click();
      be.navCreateBucketBtn.click();
      expect(be.bucketForm.isDisplayed()).toBe(true);
    });
  });

  describe('When the bucket form show and the user clicks the [Cancel] button',() => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.bucketFormCancelBtn.get(1).click();
    });
    it('Should check hide Create Bucket form',() => {
      expect(be.bucketForm.isPresent()).not.toBe(true);
    });
  });

  describe('When the bucket form show and the user clicks the [x] button',() => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.bucketFormCancelBtn.first().click();
    });
    it('Should check hide Create Bucket form',() => {
      expect(be.bucketForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user has not input bucket name : ',() => {
    beforeEach(() => {
      be.createBucketBtn.click();
    });
    it('Should check the [CREATE] is disabled',() => {
      expect(be.checkCreateBucketBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user input bucket name : ',() => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
    });
    it('Should check the [CREATE] is enabled',() => {
      expect(be.checkCreateBucketBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user input bucket name and click the [CREATE] button: ',() => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
    });
    it('Should check show create bucket success message',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user has added a new bucket: ',() => {
    it('Should check the bucket exists in the file list',() => {
      expect(be.bucketList.getText()).toContain(env.bucketName);
    });
    it('Should check sort situation',() => {
      be.bucketList.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
    });
  });
});
