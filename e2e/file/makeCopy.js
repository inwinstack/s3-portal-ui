const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const replicateBtnElements = require('../elements/makeCopy.js');
const naturalSort = require('javascript-natural-sort');
const pages = require('../page.js');

describe('File Replicate', () => {
  const evn = new environment();
  const nae = new navElements();
  const sie = new signinElements();
  const bue = new bucketElements();
  const fie = new fileElements();
  const ree = new replicateBtnElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    evn.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  //upload
  describe('When user into the upload file form and the list is not empty:', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(evn.abImgPath+evn.abImgName);
      fie.checkUploadBtn.click();
    });

    it('Should check show upload success', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  //menu replicateBtn flase
  describe('When click menuBtn and check replicateFileBtn:', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(2).click();
    });

    it('Should check the [Replicate] button is disabled', () => {
        expect(nae.replicateFileBtn.isEnabled()).toBe(false);
    });
  });

  //menu replicateFileBtn true
  describe('When click menuBtn and check replicateFileBtn', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check the [Replicate] button is enable', () => {
      expect(nae.replicateFileBtn.isEnabled()).toBe(true);
    });
  });

  //menu replicateCancelBtn ture
  describe('When click menuBtn and check replicateCancelBtn', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
      ree.replicateCancelBtn.click();
    });

    it('Should check the [Cancel] button is enable', () => {
      expect(ree.replicateForm.isPresent()).toBe(false);
    });
  });

  //Replicate rename
  describe('When click replicateFileBtn and confirm', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.replicateFileBtn.click();
      ree.replicateConfirmBtn.click();
    });

    it('Should check toast and file name', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(fie.fileList.get(1).element(by.css('[class="break-word flex-grow"]')).getText()).toBe("ab_copy.png");
      browser.ignoreSynchronization = false;
      fie.fileList.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
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
