const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const moveElements = require('../elements/move.js');
const folderElements = require('../elements/folder.js');
const naturalSort = require('javascript-natural-sort');
const languages = require('../languages/index.js');
const pages = require('../page.js');

describe('File Move',() => {
  const evn = new environment();
  const nae = new navElements();
  const sie = new signinElements();
  const bue = new bucketElements();
  const fie = new fileElements();
  const mve = new moveElements();
  const foe = new folderElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    evn.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  //signIn
  describe('When user signIn and click user list:', () => {
    beforeEach(() => {
      sie.emailInput.sendKeys('Titan@imac.com');
      sie.passwordInput.sendKeys('123456');
      sie.signinBtn.click();
    });

    it('Should cheak into the user list page', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
      browser.ignoreSynchronization = false;
    });
  });

//create folder
  describe('When user create folder', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(2).click();
      nae.createFolder.get(1).click();
      foe.checkCreateFolderBtn.click();
    });

    it('Should create folder success',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

//upload
  describe('When user into the upload file form and the list is not empty:', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(evn.abImgPath+evn.abImgName);
      browser.ignoreSynchronization = true;
      fie.selectUploadFile.sendKeys(evn.abcImgPath+evn.abcImgName);
      browser.sleep(1000);
      fie.checkUploadBtn.click();
    });

    it('Should check show upload success', () => {
      browser.sleep(3000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

//menu moveBtn false
  describe('When click menuBtn:', () => {
      beforeEach(() => {
        browser.actions().doubleClick(bue.bucketList.first()).perform();
        nae.menuBtn.get(2).click();
      });

      it('Should check the [Move] button is disabled', () => {
        expect(nae.moveFileBtn.isEnabled()).toBe(false);
      });
  });

//moveForm moveBtn this false
  describe('When click moveBtn moveThis disabled', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
    });

    it('Should check the [Move] button is disabled', () => {
      expect(mve.moveBtn.isEnabled()).toBe(false);
    });
  });

//moveForm cancelBtn0 true
  describe('When click moveBtn check closeBtn', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      mve.closeBtn.get(0).click();
    });

    it('Should check the [Close] button is enable', () => {
      expect(mve.moveForm.isPresent()).toBe(false);
    });
  });

//moveForm cancelBtn1 true
  describe('When click moveBtn check closeBtn', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      mve.closeBtn.get(1).click();
    });

    it('Should check the [Close] button is enable', () => {
      expect(mve.moveForm.isPresent()).toBe(false);
    });
  });

//move file
  describe('When user move', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should cheak into the user list page and check sort situation', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(browser.getCurrentUrl()).toBe(ps.bucketListPage + "/Apple");
      browser.ignoreSynchronization = false;
      fie.fileList.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
    });
  });

//moveFile failure
  describe('When user move failure', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(evn.abImgPath+evn.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check toastMessage is failure', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toMatch(languages('en','TOAST_MOVE_FAILURE'));
      browser.ignoreSynchronization = false;
    });
  });
//deleted file
  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      fie.fileCheckbox.get(1).click();
      fie.fileCheckbox.get(2).click();
      nae.menuBtn.get(2).click();
      nae.deleteFileBtn.click();
      nae.checkDeleteFileBtn.click();
    });

    it('Should deleted file', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    });
  });
});
