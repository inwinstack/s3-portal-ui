const environment = require('../environment/index.js');
const navElements = require('../elements/nav.js');
const signinElements = require('../elements/signin.js')
const bucketElements = require('../elements/bucket.js');
const fileElements = require('../elements/file.js');
const moveElements = require('../elements/move.js');
const folderElements = require('../elements/folder.js');
const naturalSort = require('javascript-natural-sort');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Folder Move',() => {
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

  //create folder
  describe('When user create folder :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(2).click();
      nae.createFolder.get(1).click();
      foe.checkCreateFolderBtn.click();
      nae.menuBtn.get(2).click();
      nae.createFolder.get(1).click();
      foe.createFolderInput.sendKeys("1");
      foe.checkCreateFolderBtn.click();
      browser.actions().doubleClick(fie.fileList.get(1)).perform();
      fie.uploadBtn.click();
      fie.selectUploadFile.sendKeys(evn.abImgPath+evn.abImgName);
      fie.selectUploadFile.sendKeys(evn.abcImgPath+evn.abcImgName);
      fie.checkUploadBtn.click();
    });

    it('',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(3000);
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.ignoreSynchronization = false;
    });
  });

  //menu Move true
  describe('When click menuBtn and check moveFileBtn isEnabled :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
    });

    it('Should check the menu [Move] is true', () => {
      expect(nae.moveFileBtn.isEnabled()).toBe(true);
    });
  });

  //moveForm moveBtn false and form is true
  describe('When click moveBtn moveThis disabled :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(0).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
    });

    it('Should check the [Move] button is disabled', () => {
      expect(mve.moveForm.isPresent()).toBe(true);
      expect(mve.moveBtn.isEnabled()).toBe(false);
    });
  });

  //move folder
  describe('When user move folder:', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(3000);
    });

    it('Should check toastMessage successfully', () => {
      expect(nae.toastMessage.isDisplayed()).toBe(true);
      browser.sleep(1000);
      expect(mve.moveForm.isPresent()).toBe(false);
      browser.ignoreSynchronization = false;
    });
  });

  //check file
  describe('When the user checks whether the mobile data is correct :', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      browser.actions().doubleClick(fie.fileList.first()).perform();
      browser.actions().doubleClick(fie.fileList.first()).perform();
    });

    it('Should check file exist', () => {
      expect(fie.fileList.get(0).element(by.css('p[class="break-word flex-grow"]')).getText()).toBe(evn.abImgName);
      expect(fie.fileList.get(1).element(by.css('p[class="break-word flex-grow"]')).getText()).toBe(evn.abcImgName);
    });
  });

  describe('When user move folder:', () => {
    beforeEach(() => {
      browser.actions().doubleClick(bue.bucketList.first()).perform();
      nae.menuBtn.get(2).click();
      nae.createFolder.get(1).click();
      foe.createFolderInput.sendKeys("1");
      foe.checkCreateFolderBtn.click();
      fie.fileCheckbox.get(1).click();
      nae.menuBtn.get(2).click();
      nae.moveFileBtn.click();
      browser.actions().doubleClick(mve.fileMoveList.first()).perform();
      mve.moveBtn.click();
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
    });

    it('Should check toastMessage failure', () => {
      expect(fie.fileList.get(1).element(by.css('p[class="break-word flex-grow"]')).getText()).toBe("New folder1");
      browser.sleep(3000);
      expect(mve.moveForm.isPresent()).toBe(false);
      browser.ignoreSynchronization = false;
    });
  });

  //deleted file
  describe('Deleted file :', () => {
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
