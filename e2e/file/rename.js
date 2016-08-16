const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const folderElements = require('../elements/folder.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('File Rename',() => {
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

  describe('When user not select any file : ', () => {
    beforeEach(() => {
      // sie.emailInput.sendKeys(env.correctEmail);
      // sie.passwordInput.sendKeys(env.correctPassword);
      // sie.signinBtn.click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Rename] button is disabled ', () => {
      expect(fe.renameFileBtn.isEnabled()).toBe(false);
    });
  });

  describe('When user select bucket : ', () => {
    beforeEach(() => {
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Rename] button is disabled ', () => {
      expect(fe.renameFileBtn.isEnabled()).toBe(false);
    });
  });

  describe('When user select folder : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fo.createFolderBtn.first().click();
      fo.createFolderInput.clear();
      fo.createFolderInput.sendKeys(env.folderName);
      fo.checkCreateFolderBtn.click();
      fo.folderCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Rename] button is disabled ', () => {
      expect(fe.renameFileBtn.isEnabled()).toBe(false);
    });
  });

  describe('When user select file : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
    });
    it('Should check the [Rename] button is enabled ', () => {
      expect(fe.renameFileBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user select file and select [Rename] button : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
    });
    it('Should check the rename file form is displayed ', () => {
      expect(fe.renameFileForm.isPresent()).toBe(true);
    });
  });

  describe('When user into the file rename form and click [X] btn ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileCancelBtn.first().click();
    });
    it('Should check the rename file form is not displayed ', () => {
      expect(fe.renameFileForm.isPresent()).toBe(false);
    });
  });

  describe('When user into the file rename form and click cancel btn ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileCancelBtn.get(1).click();
    });
    it('Should check the rename file form is not displayed ', () => {
      expect(fe.renameFileForm.isPresent()).toBe(false);
    });
  });

  describe('When user into the file rename form and send empty ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileInput.sendKeys();
    });
    it('Should check the rename check button is disabled ', () => {
      expect(fe.checkRenameBtn.isEnabled()).toBe(false);
    });
  });

  describe('When user into the file rename form and send same file name ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileInput.sendKeys(env.smallImgName1);
      fe.checkRenameBtn.click();
    });
    it('Should check the rename error message ', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(fe.renameFileForm.isPresent()).toBe(true);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user into the file rename form and send new file name ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileInput.sendKeys(env.smallImgNewName1);
      fe.checkRenameBtn.click();
    });
    it('Should check the rename success message ', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(fe.renameFileForm.isPresent()).toBe(false);
    });
  });

  describe('When user into the file rename form and send other file name ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      browser.actions().doubleClick(fo.folderList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
      fe.fileCheckbox.get(1).click();
      ne.menuBtn.get(2).click();
      fe.renameFileBtn.click();
      fe.renameFileInput.sendKeys(env.smallImgNewName1);
      fe.checkRenameBtn.click();
    });
    it('Should check the rename error message ', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(fe.renameFileForm.isPresent()).toBe(true);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
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
