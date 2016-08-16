const environment = require('../environment/index.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const fileElements = require('../elements/file.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Upload File Status',() => {
  const env = new environment();
  const be = new bucketElements();
  const sie = new signinElements();
  const fe = new fileElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  describe('When user is uploading files : ',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
    });
    it('Should check whether the upload status page', () => {
      expect(fe.transfersForm.isDisplayed()).toBe(true);
    });
  });

  describe('When user is uploading a file and open the upload status page : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
    });
    it('Should check the display upload file name and upload progress', () => {
      expect(fe.transfersProgress.isPresent()).toBe(true);
      expect(fe.transfersInto.isPresent()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user upload a file is completed and clicks automatically clear : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
      fe.clearTransferList.click();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
    });
    it('Should check clear file upload is complete', () => {
      expect(fe.transfersList.count()).toBe(0);
    });
  });

  describe('When user is uploading a file and open the upload status page to interrupt upload: ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fe.uploadInterruptBtn.click();
      browser.sleep(500);
    });
    it('Should check the upload interrupt form is displayed', () => {
      expect(fe.uploadInterruptForm.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user is uploading a file and click interrupt upload button but click [CANCEL]: ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fe.uploadInterruptBtn.click();
      browser.sleep(500);
      fe.cancelUploadInterrupt.click();
      browser.sleep(500);
    });
    it('Should check the disabled upload progress', () => {
      expect(fe.transfersProgress.isPresent()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user is uploading a file and click interrupt upload button and click [delete]: ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.transfersBtn.click();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fe.uploadInterruptBtn.click();
      browser.sleep(500);
      fe.checkUploadInterrupt.click();
      browser.sleep(500);
    });
    it('Should check the disabled upload progress', () => {
      expect(fe.transfersProgress.isPresent()).toBe(false);
      browser.ignoreSynchronization = false;
    });
  });
});
