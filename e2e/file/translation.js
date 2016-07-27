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
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketList.first().click();
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

  describe('When user into the upload file form and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketList.first().click();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw', 'UTILS_UPLOAD'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('tw', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(21).getText()).toBe(translate('tw', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(22).getText()).toBe(translate('tw', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('tw', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketList.first().click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is uploaded successfully!$/);
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw' , 'ACTION_NAVBAR_TRANSFERS'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('tw' , 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('tw' , 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('tw' , 'TRANSFER_STATUS_COMPLETED'));
    });
  });

  describe('When user click properties and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      fie.propertiesBtn.get(1).click();
    });
    it('Should check every elements using the right language',() => {
      expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw' , 'ACTION_NAVBAR_PROPERTIES'));
      // expect(fie.propertiesFileListItem.first().getText()).toBe(translate('tw' , 'FILE_NAME'));
      expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('tw' , 'FILE_SIZE'));
      expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('tw' , 'FILE_STORAGE_CLASS'));
      expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('tw' , 'FILE_LAST_MODIFIED'));
      expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('tw' , 'FILE_OWNER'));
    });
  });

  describe('When user selects a file to be deleted and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketList.first().click();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is deleted successfully!$/);
      browser.ignoreSynchronization = false;
    });
  });

  // CN
  describe('When user into the file management page and selects the Simplified Chinese language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketList.first().click();
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

  describe('When user into the upload file form and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketList.first().click();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn', 'UTILS_UPLOAD'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('cn', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(21).getText()).toBe(translate('cn', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(22).getText()).toBe(translate('cn', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('cn', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketList.first().click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is uploaded successfully!$/);
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn' , 'ACTION_NAVBAR_TRANSFERS'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('cn' , 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('cn' , 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('cn' , 'TRANSFER_STATUS_COMPLETED'));
    });
  });

describe('When user click properties and selects the Simplified Chinese language : ',() => {
  beforeEach(() => {
    ne.menuBtn.get(1).click();
    ne.topNavLanguagesBtn.get(2).click();
    fie.propertiesBtn.get(1).click();
  });
  it('Should check every elements using the right language',() => {
    expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn' , 'ACTION_NAVBAR_PROPERTIES'));
    // expect(fie.propertiesFileListItem.first().getText()).toBe(translate('cn' , 'FILE_NAME'));
    expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('cn' , 'FILE_SIZE'));
    expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('cn' , 'FILE_STORAGE_CLASS'));
    expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('cn' , 'FILE_LAST_MODIFIED'));
    expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('cn' , 'FILE_OWNER'));
  });
});

  describe('When user selects a file to be deleted and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketList.first().click();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is deleted successfully!$/);
      browser.ignoreSynchronization = false;
    });
  });

  // EN
  describe('When user into the file management page and selects the English language : ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketList.first().click();
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

  describe('When user into the upload file form and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketList.first().click();
      fie.uploadBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(fie.uploadForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en', 'UTILS_UPLOAD_2'));
      expect(fie.uploadForm.element(by.css('p[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_UPLOAD_DESCRIPTION'));
      expect(fie.selectUploadFileBtn.getText()).toBe(translate('en', 'FILE_ADD'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(21).getText()).toBe(translate('en', 'FILE_NUMBER_OF'));
      expect(element.all(by.css('span[class="ng-scope"]')).get(22).getText()).toBe(translate('en', 'FILE_TOTAL_SIZE'));
      expect(fie.uploadCancelBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(fie.checkUploadBtn.getText()).toBe(translate('en', 'UTILS_UPLOAD'));
    });
  });

  describe('When user successfully uploaded files and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketList.first().click();
      fie.transfersBtn.click();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(env.smallImgPath1 + env.smallImgName1);
      fie.checkUploadBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is uploaded successfully!$/);
      browser.ignoreSynchronization = false;
      expect(fie.transfersForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en' , 'ACTION_NAVBAR_TRANSFERS_2'));
      expect(fie.transfersForm.element(by.css('p[class="md-body-1 md-accent ng-scope"]')).getText()).toBe(translate('en' , 'TRANSFER_AUTO_CLEAR'));
      expect(fie.transfersForm.element(by.css('h3[class="inline-block ng-scope"]')).getText()).toMatch(translate('en' , 'TRANSFER_TITLE_UPLOAD'));
      expect(fie.transfersForm.element(by.css('span[ng-if="transfer.showInfo(t)"]')).getText()).toMatch(translate('en' , 'TRANSFER_STATUS_COMPLETED'));
    });
  });

describe('When user click properties and selects the English language : ',() => {
  beforeEach(() => {
    ne.menuBtn.get(1).click();
    ne.topNavLanguagesBtn.get(0).click();
    fie.propertiesBtn.get(1).click();
  });
  it('Should check every elements using the right language',() => {
    expect(fie.propertiesForm.element(by.css('md-toolbar[class="md-menu-toolbar"]')).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en' , 'ACTION_NAVBAR_PROPERTIES_2'));
    expect(fie.propertiesFileListItem.first().getText()).toBe(translate('en' , 'FILE_NAME'));
    expect(fie.propertiesFileListItem.get(1).getText()).toBe(translate('en' , 'FILE_SIZE'));
    expect(fie.propertiesFileListItem.get(2).getText()).toBe(translate('en' , 'FILE_STORAGE_CLASS'));
    expect(fie.propertiesFileListItem.get(3).getText()).toBe(translate('en' , 'FILE_LAST_MODIFIED'));
    expect(fie.propertiesFileListItem.get(4).getText()).toBe(translate('en' , 'FILE_OWNER'));
  });
});

  describe('When user selects a file to be deleted and selects the English language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketList.first().click();
      fie.fileCheckbox.first().click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(/^.* is deleted successfully!$/);
      browser.ignoreSynchronization = false;
    });
  });
});
