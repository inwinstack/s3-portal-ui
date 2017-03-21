const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const navElements = require('../elements/nav.js');
const fileElements = require('../elements/file.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const replicateElements = require('../elements/makeCopy.js');
const pages = require('../page.js');

describe('File Replicate Translation', () => {
  const env = new environment();
  const sie = new signinElements();
  const bue = new bucketElements();
  const fie = new fileElements();
  const nae = new navElements();
  const ps = new pages();
  const ree = new replicateElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  //EN
  describe('When user into the upload file form and the list is not empty :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
    });

    it('Should check show upload success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user into the file management page and selects the English language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.replicateFileBtn.getText()).toBe(translate('en','UTILS_REPLICATE'));
    });
  });

  describe('When user click replicateFileBtn and selects the English language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
    });

    it('Should show replicate form and check every elements using the right language', () => {
      expect(ree.replicateForm.isPresent()).toBe(true);
      expect(ree.replicateForm.element(by.css('h2[class="md-title ng-binding"]')).getText()).toBe(translate('en','REPLICATE_DESCRIPTION'));
      expect(ree.replicateCancelBtn.getText()).toBe(translate('en','REPLICATE_CANCEL'));
      expect(ree.replicateConfirmBtn.getText()).toBe(translate('en','REPLICATE_CONFIRM'));
    });
  });

  describe('When user click replicateConfirmBtn and check toast and selects the English language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
      ree.replicateConfirmBtn.click();
    });

    it('Should check toastMessage is success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.getText()).toBe(translate('en','TOAST_REPLICATE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  //deleted file
  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      fie.fileCheckbox.get(1).click();
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

  //TW
  describe('When user into the upload file form and the list is not empty :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
    });

    it('Should check show upload success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user into the file management page and selects the Traditional Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.replicateFileBtn.getText()).toBe(translate('tw','UTILS_REPLICATE'));
    });
  });

  describe('When user click replicateFileBtn and selects the Traditional Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
    });

    it('Should show replicate form and check every elements using the right language', () => {
      expect(ree.replicateForm.isPresent()).toBe(true);
      expect(ree.replicateForm.element(by.css('h2[class="md-title ng-binding"]')).getText()).toBe(translate('tw','REPLICATE_DESCRIPTION'));
      expect(ree.replicateCancelBtn.getText()).toBe(translate('tw','REPLICATE_CANCEL'));
      expect(ree.replicateConfirmBtn.getText()).toBe(translate('tw','REPLICATE_CONFIRM'));
    });
  });

  describe('When user click replicateConfirmBtn and check toast and selects the Traditional Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
      ree.replicateConfirmBtn.click();
    });

    it('Should check toastMessage is success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('tw','TOAST_REPLICATE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  //deleted file
  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      fie.fileCheckbox.get(1).click();
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

  //CN
  describe('When user into the upload file form and the list is not empty :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
    });

    it('Should check show upload success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user into the file management page and selects the Simplified Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.replicateFileBtn.getText()).toBe(translate('cn','UTILS_REPLICATE'));
    });
  });

  describe('When user click replicateFileBtn and selects the Simplified Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
    });

    it('Should show replicate form and check every elements using the right language', () => {
      expect(ree.replicateForm.isPresent()).toBe(true);
      expect(ree.replicateForm.element(by.css('h2[class="md-title ng-binding"]')).getText()).toBe(translate('cn','REPLICATE_DESCRIPTION'));
      expect(ree.replicateCancelBtn.getText()).toBe(translate('cn','REPLICATE_CANCEL'));
      expect(ree.replicateConfirmBtn.getText()).toBe(translate('cn','REPLICATE_CONFIRM'));
    });
  });

  describe('When user click replicateConfirmBtn and check toast and selects the Simplified Chinese language :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
      ree.replicateConfirmBtn.click();
    });

    it('Should check toastMessage is success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.getText()).toBe(translate('cn','TOAST_REPLICATE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  //deleted file
  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      fie.fileCheckbox.get(1).click();
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
