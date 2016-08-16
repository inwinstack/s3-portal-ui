const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const folderElements = require('../elements/folder.js');
const navElements = require('../elements/nav.js');
const fileElements = require('../elements/file.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('File Translation', () => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const fie = new fileElements();
  const ne = new navElements();
  const foe = new folderElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  // TW
  describe('When user into the file management page and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadFileBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_UPLOAD'));
      expect(fie.uploadBtn.element(by.css('span[ng-show="actionNav.isFile()"]')).getText()).toBe(translate('tw', 'UTILS_UPLOAD'));
      expect(fie.createFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_CREATE_FOLDER'));
      expect(foe.createFolderBtn.get(0).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_CREATE_FOLDER'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'ACTION_NAVBAR_ACTIONS'));
      expect(fie.noFileTitle.getText()).toBe(translate('tw', 'FILE_EMPTY_BUCKET'));
      expect(fie.noFileSubtitle.getText()).toBe(translate('tw', 'FILE_DO_ACTIONS'));
      expect(fie.or.getText()).toBe(translate('tw', 'UTILS_OR'));
    });
  });

  describe('When user into the upload file form and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw', 'UTILS_UPLOAD'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('tw', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(25).getText()).toBe(translate('tw', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(26).getText()).toBe(translate('tw', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('tw', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'FILE_UPLOAD_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'ACTION_NAVBAR_TRANSFERS'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('tw', 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('tw', 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('tw', 'TRANSFER_STATUS_COMPLETED'));
    });
  });

  describe('When user select rename files and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.renameFileForm.element(by.css('[class="md-toolbar-tools"]')).element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw', 'RENAME_TITLE'));
      expect(fie.renameFileForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('tw', 'RENAME_DESCRIPTION'));
      expect(fie.renameFileForm.element(by.css('[class="md-prompt-input-container ng-scope md-input-has-placeholder md-default-theme md-input-has-value"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'RENAME_ITEM_NAME'));
      expect(fie.renameFileForm.element(by.css('[class="md-block"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'RENAME_NEW_NAME'));
      expect(fie.renameFileCancelBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(fie.renameFileForm.element(by.css('[ng-click="rename.rename()"]')).getText()).toBe(translate('tw', 'UTILS_CONFIRM'));
    });
  });

  describe('When user select rename files  send same name and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'RENAME_FAILURE'));
      browser.ignoreSynchronization = false;
      expect(fie.renameFileForm.element(by.css('[class="md-block md-input-has-value"]')).element(by.css('span[class="md-caption text-warn ng-scope"]')).getText()).toBe(translate('tw', 'FILE_FOLDER_DUPLICATED_MESSAGE'));
    });
  });

  describe('When user select rename files  send new name and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgNewName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'RENAME_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click properties and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      fie.propertiesBtn.get(1).click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'ACTION_NAVBAR_PROPERTIES'));
      expect(fie.propertiesFileListItem.first().getText()).toBe(translate('tw' , 'FILE_NAME'));
      expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('tw', 'FILE_SIZE'));
      expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('tw', 'FILE_STORAGE_CLASS'));
      expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('tw', 'FILE_LAST_MODIFIED'));
      expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('tw', 'FILE_OWNER'));
    });
  });

  describe('When user selects a file to be deleted and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
      ne.checkDeleteFileBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'FILE_DELETE_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user upload file and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
    });
    it('Should check cancel elements using the right language', () => {
      expect(fie.uploadInterruptBtn.getText()).toBe(translate('tw' , 'UTILS_CANCEL'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click interrupt upload file  button and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadInterruptTitle.getText()).toBe(translate('tw' , 'TRANSFER_CANCEL_TITLE'));
      expect(fie.uploadInterruptDescription.getText()).toBe(translate('tw' , 'TRANSFER_CANCEL_DESCRIPTION'));
      expect(fie.cancelUploadInterrupt.getText()).toBe(translate('tw' , 'UTILS_CANCEL'));
      expect(fie.checkUploadInterrupt.getText()).toBe(translate('tw' , 'UTILS_CONFIRM'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user interrupt success upload file  button and selects the Traditional Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
      fie.checkUploadInterrupt.click();
      browser.sleep(1000);
    });
    it('Should check every elements using the right language', () => {
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TRANSFER_CANCEL_UPLOAD'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersCanceled.getText()).toBe(translate('tw' , 'TRANSFER_CANCELED'));
    });
  });

  // CN
  describe('When user into the file management page and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadFileBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_UPLOAD'));
      expect(fie.uploadBtn.element(by.css('span[ng-show="actionNav.isFile()"]')).getText()).toBe(translate('cn', 'UTILS_UPLOAD'));
      expect(fie.createFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_CREATE_FOLDER'));
      expect(foe.createFolderBtn.get(0).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_CREATE_FOLDER'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'ACTION_NAVBAR_ACTIONS'));
      expect(fie.noFileTitle.getText()).toBe(translate('cn', 'FILE_EMPTY_BUCKET'));
      expect(fie.noFileSubtitle.getText()).toBe(translate('cn', 'FILE_DO_ACTIONS'));
      expect(fie.or.getText()).toBe(translate('cn', 'UTILS_OR'));
    });
  });

  describe('When user into the upload file form and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn', 'UTILS_UPLOAD'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('cn', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(25).getText()).toBe(translate('cn', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(26).getText()).toBe(translate('cn', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('cn', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'FILE_UPLOAD_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'ACTION_NAVBAR_TRANSFERS'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('cn', 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('cn', 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('cn', 'TRANSFER_STATUS_COMPLETED'));
    });
  });

  describe('When user select rename files and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.renameFileForm.element(by.css('[class="md-toolbar-tools"]')).element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn', 'RENAME_TITLE'));
      expect(fie.renameFileForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('cn', 'RENAME_DESCRIPTION'));
      expect(fie.renameFileForm.element(by.css('[class="md-prompt-input-container ng-scope md-input-has-placeholder md-default-theme md-input-has-value"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'RENAME_ITEM_NAME'));
      expect(fie.renameFileForm.element(by.css('[class="md-block"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'RENAME_NEW_NAME'));
      expect(fie.renameFileCancelBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(fie.renameFileForm.element(by.css('[ng-click="rename.rename()"]')).getText()).toBe(translate('cn', 'UTILS_CONFIRM'));
    });
  });

  describe('When user select rename files  send same name and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'RENAME_FAILURE'));
      browser.ignoreSynchronization = false;
      expect(fie.renameFileForm.element(by.css('[class="md-block md-input-has-value"]')).element(by.css('span[class="md-caption text-warn ng-scope"]')).getText()).toBe(translate('cn', 'FILE_FOLDER_DUPLICATED_MESSAGE'));
    });
  });

  describe('When user select rename files  send new name and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgNewName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'RENAME_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click properties and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      fie.propertiesBtn.get(1).click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'ACTION_NAVBAR_PROPERTIES'));
      expect(fie.propertiesFileListItem.first().getText()).toBe(translate('cn' , 'FILE_NAME'));
      expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('cn', 'FILE_SIZE'));
      expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('cn', 'FILE_STORAGE_CLASS'));
      expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('cn', 'FILE_LAST_MODIFIED'));
      expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('cn', 'FILE_OWNER'));
    });
  });

  describe('When user selects a file to be deleted and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
      ne.checkDeleteFileBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'FILE_DELETE_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user upload file and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
    });
    it('Should check cancel elements using the right language', () => {
      expect(fie.uploadInterruptBtn.getText()).toBe(translate('cn' , 'UTILS_CANCEL'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click interrupt upload file  button and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadInterruptTitle.getText()).toBe(translate('cn' , 'TRANSFER_CANCEL_TITLE'));
      expect(fie.uploadInterruptDescription.getText()).toBe(translate('cn' , 'TRANSFER_CANCEL_DESCRIPTION'));
      expect(fie.cancelUploadInterrupt.getText()).toBe(translate('cn' , 'UTILS_CANCEL'));
      expect(fie.checkUploadInterrupt.getText()).toBe(translate('cn' , 'UTILS_CONFIRM'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user interrupt success upload file  button and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
      fie.checkUploadInterrupt.click();
      browser.sleep(1000);
    });
    it('Should check every elements using the right language', () => {
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TRANSFER_CANCEL_UPLOAD'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersCanceled.getText()).toBe(translate('cn' , 'TRANSFER_CANCELED'));
    });
  });

  // EN
  describe('When user into the file management page and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadFileBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_UPLOAD'));
      expect(fie.uploadBtn.element(by.css('span[ng-show="actionNav.isFile()"]')).getText()).toBe(translate('en', 'UTILS_UPLOAD'));
      expect(fie.createFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_CREATE_FOLDER'));
      expect(foe.createFolderBtn.get(0).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_CREATE_FOLDER'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'ACTION_NAVBAR_ACTIONS'));
      expect(fie.noFileTitle.getText()).toBe(translate('en', 'FILE_EMPTY_BUCKET'));
      expect(fie.noFileSubtitle.getText()).toBe(translate('en', 'FILE_DO_ACTIONS'));
      expect(fie.or.getText()).toBe(translate('en', 'UTILS_OR'));
    });
  });

  describe('When user into the upload file form and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en', 'UTILS_UPLOAD_2'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('en', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(25).getText()).toBe(translate('en', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(26).getText()).toBe(translate('en', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('en', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'FILE_UPLOAD_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'ACTION_NAVBAR_TRANSFERS_2'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('en', 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('en', 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('en', 'TRANSFER_STATUS_COMPLETED'));
    });
  });

  describe('When user select rename files and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(fie.renameFileForm.element(by.css('[class="md-toolbar-tools"]')).element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en' , 'RENAME_TITLE'));
      expect(fie.renameFileForm.element(by.css('span[class="ng-binding ng-scope"]')).getText()).toBe(translate('en' , 'RENAME_DESCRIPTION'));
      expect(fie.renameFileForm.element(by.css('[class="md-prompt-input-container ng-scope md-input-has-placeholder md-default-theme md-input-has-value"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en' , 'RENAME_ITEM_NAME'));
      expect(fie.renameFileForm.element(by.css('[class="md-block"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en' , 'RENAME_NEW_NAME'));
      expect(fie.renameFileCancelBtn.get(1).getText()).toBe(translate('en' , 'UTILS_CANCEL'));
      expect(fie.renameFileForm.element(by.css('[ng-click="rename.rename()"]')).getText()).toBe(translate('en' , 'UTILS_CONFIRM'));
    });
  });

  describe('When user select rename files  send same name and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en' , 'RENAME_FAILURE'));
      browser.ignoreSynchronization = false;
      expect(fie.renameFileForm.element(by.css('[class="md-block md-input-has-value"]')).element(by.css('span[class="md-caption text-warn ng-scope"]')).getText()).toBe(translate('en' , 'FILE_FOLDER_DUPLICATED_MESSAGE'));
    });
  });

  describe('When user select rename files  send new name and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      fie.renameFileBtn.click();
      fie.renameFileInput.sendKeys(env.smallImgNewName1);
      fie.checkRenameBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en' , 'RENAME_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click properties and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      fie.propertiesBtn.get(1).click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'ACTION_NAVBAR_PROPERTIES_2'));
      expect(fie.propertiesFileListItem.first().getText()).toBe(translate('en', 'FILE_NAME'));
      expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('en', 'FILE_SIZE'));
      expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('en', 'FILE_STORAGE_CLASS'));
      expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('en', 'FILE_LAST_MODIFIED'));
      expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('en', 'FILE_OWNER'));
    });
  });

  describe('When user selects a file to be deleted and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
      ne.checkDeleteFileBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'FILE_DELETE_SUCCESS_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user upload file and selects the English language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
    });
    it('Should check cancel elements using the right language', () => {
      expect(fie.uploadInterruptBtn.getText()).toBe(translate('en' , 'UTILS_CANCEL'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user click interrupt upload file  button and selects the English language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadInterruptTitle.getText()).toBe(translate('en' , 'TRANSFER_CANCEL_TITLE'));
      expect(fie.uploadInterruptDescription.getText()).toBe(translate('en' , 'TRANSFER_CANCEL_DESCRIPTION'));
      expect(fie.cancelUploadInterrupt.getText()).toBe(translate('en' , 'UTILS_CANCEL'));
      expect(fie.checkUploadInterrupt.getText()).toBe(translate('en' , 'UTILS_CONFIRM'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user interrupt success upload file  button and selects the English language : ', () => {
    beforeEach(() => {
      browser.actions().doubleClick(be.bucketList.first()).perform();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.bigImgPath + env.bigImgName);
      fie.checkUploadBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      fie.uploadInterruptBtn.click();
      browser.sleep(500);
      fie.checkUploadInterrupt.click();
      browser.sleep(1000);
    });
    it('Should check every elements using the right language', () => {
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TRANSFER_CANCEL_UPLOAD'));
      browser.ignoreSynchronization = false;
      expect(fie.transfersCanceled.getText()).toBe(translate('en' , 'TRANSFER_CANCELED'));
    });
  });

  describe('When user click the [Sign Out] : ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Clear',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      browser.ignoreSynchronization = false;
    });
  });
});
