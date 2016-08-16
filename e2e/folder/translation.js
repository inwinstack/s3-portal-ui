const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const naturalSort = require('javascript-natural-sort');
const folderElements = require('../elements/folder.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');

describe('Folder Translation',() => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const ps = new pages();
  const ne = new navElements();
  const foe = new folderElements();
  const ad = new administratorElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  // TW
  describe('When user opens the create folder form and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(foe.createFolderForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_CREATE_FOLDER'));
      expect(foe.folderContainer.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'FILE_FOLDER_NAME'));
      expect(foe.folderContainer.element(by.css('input[name="folder"]')).getAttribute('value')).toBe(translate('tw', 'FILE_NEW_FOLDER'));
      expect(foe.checkCreateFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'UTILS_CREATE'));
      expect(foe.cancelFormBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
    });
  });

  describe('When user create folder and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName);
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw' , 'TOAST_CREATE_FOLDER_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create folder input isExist name and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName);
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw' , 'TOAST_CREATE_FOLDER_FAIL'));
      browser.ignoreSynchronization = false;
    });
  });

  // CN
  describe('When user opens the create folder form and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(foe.createFolderForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_CREATE_FOLDER'));
      expect(foe.folderContainer.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'FILE_FOLDER_NAME'));
      expect(foe.folderContainer.element(by.css('input[name="folder"]')).getAttribute('value')).toBe(translate('cn', 'FILE_NEW_FOLDER'));
      expect(foe.checkCreateFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'UTILS_CREATE'));
      expect(foe.cancelFormBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
    });
  });

  describe('When user create folder and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName + '1');
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn' , 'TOAST_CREATE_FOLDER_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create folder input isExist name and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName + '1');
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn' , 'TOAST_CREATE_FOLDER_FAIL'));
      browser.ignoreSynchronization = false;
    });
  });

  // EN
  describe('When user opens the create folder form and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(foe.createFolderForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_CREATE_FOLDER_2'));
      expect(foe.folderContainer.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en', 'FILE_FOLDER_NAME'));
      expect(foe.folderContainer.element(by.css('input[name="folder"]')).getAttribute('value')).toBe(translate('en', 'FILE_NEW_FOLDER'));
      expect(foe.checkCreateFolderBtn.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'UTILS_CREATE'));
      expect(foe.cancelFormBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
    });
  });

  describe('When user create folder and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName + '2');
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en' , 'TOAST_CREATE_FOLDER_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create folder  input isExist name and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      browser.actions().doubleClick(be.bucketList.first()).perform();
      foe.createFolderBtn.first().click();
      foe.createFolderInput.clear();
      foe.createFolderInput.sendKeys(env.folderName + '2');
      foe.checkCreateFolderBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en' , 'TOAST_CREATE_FOLDER_FAIL'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('Clear All',() => {
    beforeEach(() => {
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Should Clear all',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      browser.ignoreSynchronization = false;
    });
  });

  describe('Clear all test account',() => {
    beforeEach(() => {
      sie.emailInput.sendKeys(env.adminEmail);
      sie.passwordInput.sendKeys(env.adminPassword);
      sie.signinBtn.click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmail);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmail);
      ad.checkDeleteUserBtn.click();
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmail + '1');
      ad.checkDeleteUserBtn.click();
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmail + '3');
      ad.checkDeleteUserBtn.click();
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmail + '5');
      ad.checkDeleteUserBtn.click();
    });
    it('Should clear all test account',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      browser.ignoreSynchronization = false;
    });
  });
});
