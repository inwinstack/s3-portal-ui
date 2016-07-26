const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const naturalSort = require('javascript-natural-sort');
const folderElements = require('../elements/folder.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const navElements = require('../elements/nav.js');

describe('Create Folder',() => {
  const env = new environment();
  const sie = new signinElements();
  const be = new bucketElements();
  const ps = new pages();
  const ne = new navElements();
  const fe = new folderElements();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
  });

  describe('When user clicks the [Create folder] button : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      fe.createFolderBtn.first().click();
    });
    it('Should check the display to create folder form',() => {
      expect(fe.createFolderForm.isDisplayed()).toBe(true);
    });
  });

  describe('When user clicks the [Action] and select the [Create folder] button : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      ne.menuBtn.get(2).click();
      fe.createFolderBtn.get(1).click();
    });
    it('Should check the display to create folder form',() => {
      expect(fe.createFolderForm.isDisplayed()).toBe(true);
    });
  });

  describe('When user opens the form create a folder : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      fe.createFolderBtn.first().click();
    });
    it('Should check the [Create] is enabled',() => {
      expect(fe.checkCreateFolderBtn.isEnabled()).toBe(true);
    });
  });

  describe('When user opens the form create a folder and clicks the [Cancel] button : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      fe.createFolderBtn.first().click();
      fe.cancelFormBtn.get(1).click();
    });
    it('Should check create folders form has been closed',() => {
      expect(fe.createFolderForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user opens the form create a folder and clicks the [x] button : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      fe.createFolderBtn.first().click();
      fe.cancelFormBtn.first().click();
    });
    it('Should check create folders form has been closed',() => {
      expect(fe.createFolderForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user inputs a name for the folder does not exist and clicks the [Create] button : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
      fe.createFolderBtn.first().click();
      fe.createFolderInput.clear();
      fe.createFolderInput.sendKeys(env.folderName);
      fe.checkCreateFolderBtn.click();
    });
    it('Should check show create folder success message and the folder name exists in the list',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      expect(ne.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
      expect(fe.folderList.all(by.binding('f.display')).getText()).toContain(env.folderName);
    });
  });

  // describe('When user inputs the name of an existing folder : ',() => {
  //   beforeEach(() => {
  //     be.bucketList.first().click();
  //     fe.createFolderBtn.first().click();
  //     fe.createFolderInput.clear();
  //     fe.createFolderInput.sendKeys(env.folderName);
  //     fe.checkCreateFolderBtn.click();
  //   });
  //   it('Should check the show message folder already exists',() => {
  //     expect(fe.folderExistMessage.getText()).toBe(translate('en', 'CREATE_FOLDER_EXIST'));
  //   });
  // });

  describe('When user has to create a new folder : ',() => {
    beforeEach(() => {
      be.bucketList.first().click();
    });
    it('Should check sort situation',() => {
      fe.folderList.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
    });
    afterEach(() => {
      fe.folderCheckbox.get(0).click();
      ne.menuBtn.get(2).click();
      ne.deleteFileBtn.click();
    })
  });
});
