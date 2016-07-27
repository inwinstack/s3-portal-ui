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
      be.bucketList.first().click();
      fe.transfersBtn.click();
    });
    it('Should check whether the upload status page', () => {
      expect(fe.transfersForm.isDisplayed()).toBe(true);
    });
  });

  describe('When user is uploading a file and open the upload status page : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
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
      be.bucketList.first().click();
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
});
