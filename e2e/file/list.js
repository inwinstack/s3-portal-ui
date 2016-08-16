const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('File List',() => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const fe = new fileElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user clicks the bucket : ', () => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
    });
    it('Should check into the file management page', () => {
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage + '/' + env.bucketName);
    });
  });

  describe('When user into the file management page but do not have any of the file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
    });
    it('Should check the [UPLOAD FILE] and [CREATE FOLDER] button is display and enabled and display title', () => {
      expect(fe.uploadFileBtn.isPresent()).toBe(true);
      expect(fe.uploadFileBtn.isEnabled()).toBe(true);
      expect(fe.createFolderBtn.isPresent()).toBe(true);
      expect(fe.createFolderBtn.isEnabled()).toBe(true);
      expect(fe.noFileTitle.isPresent()).toBe(true);
      expect(fe.noFileSubtitle.isPresent()).toBe(true);
    });
  });
});
