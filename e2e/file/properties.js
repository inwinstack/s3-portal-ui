const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const folderElements = require('../elements/folder.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('File Properties',() => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const fe = new fileElements();
  const fo = new folderElements();
  const ps = new pages();
  const ne = new navElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + '-' + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  // open properties form array value have swap
  describe('When user selects the bucketList and clicks properties : ', () => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
      ne.menuBtn.get(2).click();
      fe.propertiesBtn.get(1).click();
    });
    it('Should check whether the properties page', () => {
      expect(fe.propertiesForm.isDisplayed()).toBe(true);
      expect(fe.propertiesBtn.first().isEnabled()).toBe(false);
    });
  });

  describe('When user selects the bucketList and clicks other properties : ', () => {
    beforeEach(() => {
      fe.propertiesBtn.get(1).click();
    });
    it('Should check whether the properties page', () => {
      expect(fe.propertiesForm.isDisplayed()).toBe(true);
      expect(fe.propertiesBtn.get(1).isEnabled()).toBe(false);
    });
  });

  describe('When user into the file properties form and click [X] btn  : ', () => {
    beforeEach(() => {
      fe.propertiesBtn.get(1).click();
      fe.propertiesCancelBtn.click();
    });
    it('Should check the properties form is closed and properties is enabled', () => {
      expect(fe.propertiesForm.isDisplayed()).toBe(false);
      expect(fe.propertiesBtn.get(1).isEnabled()).toBe(true);
    });
  });

  describe('When user selects the folder and clicks properties : ', () => {
    beforeEach(() => {
      // be.bucketList.first().click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fo.createFolderBtn.first().click();
      fo.createFolderInput.clear();
      fo.createFolderInput.sendKeys(env.folderName);
      fo.checkCreateFolderBtn.click();
      fe.propertiesBtn.get(1).click();
      fo.folderList.first().click();
    });
    it('Should check whether the empty folder properties', () => {
      expect(fe.propertiesFileListDetail.first().getText()).toBe(env.folderName);
      expect(fe.propertiesFileListDetail.get(1).getText()).toBe('0 bytes');
      expect(fe.propertiesFileListDetail.get(2).getText()).toBe('STANDARD');
      // expect(fe.propertiesFileListDetail.get(3).getText()).toBe('2016-07-19 12:14:58');
      expect(fe.propertiesFileListDetail.get(4).getText()).toBe(env.correctEmail);
    });
  });

  describe('When user selects the files and clicks properties : ', () => {
    beforeEach(() => {
      // be.bucketList.first().click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
      ne.allBucketBtn.get(1).click();
      fe.propertiesBtn.get(1).click();
      fo.folderList.first().click();
    });
    it('Should check whether the folder properties', () => {
      expect(fe.propertiesFileListDetail.first().getText()).toBe(env.folderName);
      expect(fe.propertiesFileListDetail.get(1).getText()).toBe(env.smallImgSize1);
      expect(fe.propertiesFileListDetail.get(2).getText()).toBe('STANDARD');
      // expect(fe.propertiesFileListDetail.get(3).getText()).toBe('2016-07-19 12:14:58');
      expect(fe.propertiesFileListDetail.get(4).getText()).toBe(env.correctEmail);
    });
  });

  describe('When user selects the files and clicks properties : ', () => {
    beforeEach(() => {
      // be.bucketList.first().click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
      fe.propertiesBtn.get(1).click();
      fe.fileList.first().click();
    });
    it('Should check whether the files properties', () => {
      expect(fe.propertiesFileListDetail.first().getText()).toBe(env.smallImgName1);
      expect(fe.propertiesFileListDetail.get(1).getText()).toBe(env.smallImgSize1);
      expect(fe.propertiesFileListDetail.get(2).getText()).toBe('STANDARD');
      // expect(fe.propertiesFileListDetail.get(3).getText()).toBe('2016-07-19 12:14:58');
      expect(fe.propertiesFileListDetail.get(4).getText()).toBe(env.correctEmail);
    });
  });

  describe('Clear',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
    });
    it('Clear',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(be.bucketList.getText()).not.toContain(env.bucketName);
    });
  });
});
