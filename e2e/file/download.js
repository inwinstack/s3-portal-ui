const environment = require('../environment/index.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Download File',() => {
  const env = new environment();
  const be = new bucketElements();
  const sie = new signinElements();
  const fe = new fileElements();
  const ne = new navElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  describe('When user wants to download the file but not yet selected : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Download] button is disabled', () => {
      expect(ne.downloadBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When the user wants to download files but select multiple files : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath2 + env.smallImgName2);
      fe.checkUploadBtn.click();
      fe.fileCheckbox.first().click();
      fe.fileCheckbox.get(1).click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Download] button is disabled', () => {
      expect(ne.downloadBtn.isEnabled()).not.toBe(true);
    });
  });

  describe('When the user wants to download the file and select a file only : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Download] button is enabled', () => {
      expect(ne.downloadBtn.isEnabled()).toBe(true);
    });
  });
});
