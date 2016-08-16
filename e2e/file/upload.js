const environment = require('../environment/index.js');
const bucketElements = require('../elements/bucket.js');
const signinElements = require('../elements/signin.js');
const fileElements = require('../elements/file.js');
const navElements = require('../elements/nav.js');
const naturalSort = require('javascript-natural-sort');
const pages = require('../page.js');
const translate = require('../languages/index.js');

describe('Upload File',() => {
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

  describe('When user into the upload file form but the list is empty : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
    });
    it('Should check the [UPLOAD] button is disabled and the number and size of files is 0', () => {
      expect(fe.checkUploadBtn.isEnabled()).toBe(false);
      expect(fe.numberOfFiles.getText()).toBe('0');
      expect(fe.sizeOfFiles.getText()).toBe('0 bytes');
    });
  });

  describe('When user into the upload file form and click [CANCEL] btn : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.uploadCancelBtn.get(1).click();
    })
    it('Should check the upload form is closed', () => {
      expect(fe.uploadForm.isPresent()).toBe(false);
    });
  });

  describe('When user into the upload file form and click [X] btn : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.uploadCancelBtn.first().click();
    })
    it('Should check the upload form is closed', () => {
      expect(fe.uploadForm.isPresent()).toBe(false);
    });
  });

  describe('When user into the upload file form and the list is not empty : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
    });
    it('Should check the number and size of files is not 0 and the [UPLOAD] button is enabled', () => {
      expect(fe.numberOfFiles.getText()).toBe('1');
      expect(fe.sizeOfFiles.getText()).toBe(env.smallImgSize1);
      expect(fe.checkUploadBtn.isEnabled()).toBe(true);
    })
  });

  describe('When user into the upload file form and the list is not empty and click [x] button : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.cancelSeletedFiles.first().click();
    });
    it('Should check the number and size of files is not 0', () => {
      expect(fe.numberOfFiles.getText()).toBe('0');
      expect(fe.sizeOfFiles.getText()).toBe('0 bytes');
    })
  });

  describe('When user has selected file but upload file form off and then turned on : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.uploadCancelBtn.first().click();
      fe.uploadBtn.click();
    });
    it('Should check the number and size of files is not 0', () => {
      expect(fe.numberOfFiles.getText()).toBe('0');
      expect(fe.sizeOfFiles.getText()).toBe('0 bytes');
    })
  });

  describe('When user successfully uploaded files : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
    });
    it('Should check show upload success message and the file exists in the file list',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      expect(fe.fileList.all(by.binding('f.display')).getText()).toContain(env.smallImgName1);
      // expect(fe.fileList.all(by.binding('(f.Size | filesize)')).getText()).toContain(env.smallImgSize1);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user uploads a file name that already exists : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fe.checkUploadBtn.click();
    });
    it('Should check the file overwrite the original file', () => {
      expect(fe.fileList.all(by.binding('f.display')).getText()).toContain(env.smallImgName1);
      // expect(fe.fileList.all(by.binding('(f.Size | filesize)')).getText()).toContain(env.smallImgSize1);
    });
  });

  describe('When user attempts to sign out but is being uploaded file : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      ne.menuBtn.first().click();
      browser.sleep(500);
      ne.signoutBtn.click();
      browser.sleep(500);
    });
    it('Should check whether logout confirmation', () => {
      expect(fe.signoutCheck.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user attempts to sign out and clicks the [Stay] button but is being uploaded file : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      ne.menuBtn.first().click();
      browser.sleep(500);
      ne.signoutBtn.click();
      browser.sleep(500);
      fe.uploadStayBtn.click();
      browser.sleep(500);
    });
    it('Should check stay on the current page', () => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toContain(ps.bucketListPage);
      });
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage + '/' + env.bucketName);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user attempts to sign out and clicks the [Leave] button but is being uploaded file : ',() => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fe.uploadBtn.click();
      fe.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fe.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      ne.menuBtn.first().click();
      browser.sleep(500);
      ne.signoutBtn.click();
      browser.sleep(500);
      fe.uploadLeaveBtn.click();
      browser.sleep(500);
    });
    it('Should check back to sign in page', () => {
      browser.ignoreSynchronization = false;
      expect(browser.getCurrentUrl()).toBe(ps.signInPage);
    });
  });
});
