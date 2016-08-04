const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');

describe('Delete File',() => {
  const env = new environment();
  const ps = new pages();
  const sie = new signinElements();
  const be = new bucketElements();
  const fe = new fileElements();
  const ne = new navElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  describe('When user does not select any of the file : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Delete] button is disabled',() => {
      expect(ne.deleteFileBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When user selects a file to be deleted : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Delete] button is enabled',() => {
      expect(ne.deleteFileBtn.isEnabled()).toBe(true);
    });
  });

  describe('When the user selects multiple files to be deleted : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.fileCheckbox.first().click();
      fe.fileCheckbox.get(1).click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Delete] button is enabled',() => {
      expect(ne.deleteFileBtn.isEnabled()).toBe(true);
    });
  });

  describe('When the user selects multiple files to be deleted and clicks the [Delete] : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.fileCheckbox.first().click();
      fe.fileCheckbox.get(1).click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
      fe.checkDeleteFile.click();
    });
    it('Should check show delete file success message and files has been deleted',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(fe.fileList.count()).toBe(0);
    });
  });
});
