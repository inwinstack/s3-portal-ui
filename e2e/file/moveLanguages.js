const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const folderElements = require('../elements/folder.js');
const navElements = require('../elements/nav.js');
const fileElements = require('../elements/file.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const moveElements = require('../elements/move.js');
const pages = require('../page.js');

describe('File Translation', () => {
  const env = new environment();
  const sie = new signinElements();
  const bue = new bucketElements();
  const fie = new fileElements();
  const nae = new navElements();
  const mve = new moveElements();
  const foe = new folderElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  // describe('When user signIn and click user list:', () => {
  //   beforeEach(() => {
  //     sie.emailInput.sendKeys('Titan@imac.com');
  //     sie.passwordInput.sendKeys('123456');
  //     sie.signinBtn.click();
  //   });
  //
  //   it('Should cheak into the user list page', () => {
  //     browser.ignoreSynchronization = true;
  //     browser.sleep(1000);
  //     expect(nae.toastMessage.isDisplayed()).toBe(true);
  //     expect(browser.getCurrentUrl()).toBe(ps.bucketListPage);
  //     browser.ignoreSynchronization = false;
  //   });
  // });

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
  //EN
  describe('When user into the file management page and selects the English language :',() => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.moveFileBtn.getText()).toBe(translate('en','UTILS_MOVE'));
    });
  });

  describe('When user click moveFileBtn and check language', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
    });

    it('Should check every elements using the right language', () => {
      expect(mve.moveForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en','MOVE_TITLE'));
      expect(mve.moveForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('en','MOVE_DESCRIPTION'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).first().getText()).toBe(translate('en','MOVE_SELECTED_ITEMS'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).get(1).getText()).toBe(translate('en','MOVE_FOIDER'));
      // var moveForm = mve.moveForm;
      // var apple = moveForm.all(by.css('th[class="ng-scope"]')).get(0);
      // expect(apple.getText()).toBe(translate('tw','MOVE_SELECTED_ITEMS'));
    });
  });

  describe('When user move file and check toast language successfully', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('en','TOAST_MOVE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user move file and check toast language failure', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(0).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('en','TOAST_MOVE_FAILURE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.deleteFileBtn.click();
      nae.checkDeleteFileBtn.click();
      browser.actions().doubleClick(fie.fileList.first()).perform();
      fie.fileCheckbox.get(0).click();
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
  describe('When user into the file management page and selects the Traditional Chinese language :',() => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.moveFileBtn.getText()).toBe(translate('tw','UTILS_MOVE'));
    });
  });

  describe('When user click moveBtn and check language', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
    });

    it('Should check every elements using the right language', () => {
      expect(mve.moveForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw','MOVE_TITLE'));
      expect(mve.moveForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('tw','MOVE_DESCRIPTION'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).first().getText()).toBe(translate('tw','MOVE_SELECTED_ITEMS'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).get(1).getText()).toBe(translate('tw','MOVE_FOIDER'));
      // var moveForm = mve.moveForm;
      // var apple = moveForm.all(by.css('th[class="ng-scope"]')).get(0);
      // expect(apple.getText()).toBe(translate('tw','MOVE_SELECTED_ITEMS'));
    });
  });

  describe('When user move file and check toast language successfully', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('tw','TOAST_MOVE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user move file and check toast language failure', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(1).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('tw','TOAST_MOVE_FAILURE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.deleteFileBtn.click();
      nae.checkDeleteFileBtn.click();
      browser.actions().doubleClick(fie.fileList.first()).perform();
      fie.fileCheckbox.get(0).click();
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
  describe('When user into the file management page and selects the Simplified Chinese language :',() => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check every elements using the right language', () => {
      expect(nae.moveFileBtn.getText()).toBe(translate('cn','UTILS_MOVE'));
    });
  });

  describe('When user click moveBtn and check language', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
    });

    it('Should check every elements using the right language', () => {
      expect(mve.moveForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn','MOVE_TITLE'));
      expect(mve.moveForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('cn','MOVE_DESCRIPTION'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).first().getText()).toBe(translate('cn','MOVE_SELECTED_ITEMS'));
      expect(mve.moveForm.all(by.css('th[class="ng-scope"]')).get(1).getText()).toBe(translate('cn','MOVE_FOIDER'));
      // var moveForm = mve.moveForm;
      // var apple = moveForm.all(by.css('th[class="ng-scope"]')).get(0);
      // expect(apple.getText()).toBe(translate('tw','MOVE_SELECTED_ITEMS'));
    });
  });

  describe('When user move file and check toast language successfully', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('cn','TOAST_MOVE_SUCCESSFULLY'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user move file and check toast language failure', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(1).click();
      nae.topNavLanguagesBtn.get(2).click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.abImgPath+env.abImgName);
      fie.checkUploadBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
    });

    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      expect(nae.toastMessage.getText()).toBe(translate('cn','TOAST_MOVE_FAILURE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('deleted file', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.deleteFileBtn.click();
      nae.checkDeleteFileBtn.click();
      // browser.actions().doubleClick(fie.fileList.first()).perform();
      // fie.fileCheckbox.get(0).click();
      // nae.menuBtn.get(2).click();
      // nae.deleteFileBtn.click();
      // nae.checkDeleteFileBtn.click();
    });

    it('Should deleted file', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    });
  });
});
