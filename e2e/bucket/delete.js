const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');

describe('Delete Bucket',() => {
  const env = new environment();
  const ps = new pages();
  const sie = new signinElements();
  const ne = new navElements();
  const be = new bucketElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user does not select any of the bucket : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(2).click();
    });
    it('Should check the [delete bucket] button is disabled',() => {
      expect(be.deleteBucketBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user selects to be deleted Bucket : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [delete bucket] button is enabled',() => {
      expect(be.deleteBucketBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user clicks the [delete bucket] button : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
    });
    it('Should check the display to delete bucket form',() => {
      expect(be.deleteBucketForm.isDisplayed()).toBe(true);
    });
  });

  describe('When user clicks the [delete bucket] button but did not inputs the Bucket Name : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
    });
    it('Should check the [DELETE] button is disabled',() => {
      expect(be.checkDeleteBucket.isEnabled()).not.toBe(true);
    });
  });

  describe('When user opens the form create a folder and clicks the [Cancel] button : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.cancelDeleteBucketBtn.get(1).click();
    });
    it('Should check delete bucket form has been closed',() => {
      expect(be.deleteBucketForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user opens the form create a folder and clicks the [x] button : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.cancelDeleteBucketBtn.first().click();
    });
    it('Should check delete bucket form has been closed',() => {
      expect(be.deleteBucketForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user inputs bucket name does not exist : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName + '#');
    });
    it('Should check the show message bucket name is not exists',() => {
      expect(be.deleteBucketMessage.isDisplayed()).toBe(true);
    });
  });

  describe('When user inputs the bucket name consistent : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
    });
    it('Should check the [DELETE] button is enabled',() => {
      expect(be.checkDeleteBucket.isEnabled()).toBe(true);
    });
  });

  describe('When user inputs the bucket name consistent and clicks the [DELETE] button : ',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
    });
    it('Should check show delete bucket success message and bucket has been deleted',() => {
      browser.sleep(1000);
      browser.ignoreSynchronization = true;
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      expect(be.bucketList.getText()).not.toContain(env.bucketName);
      browser.ignoreSynchronization = false;
    });
  });
});
