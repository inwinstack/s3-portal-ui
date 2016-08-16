const environment = require('../environment/index.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');
const naturalSort = require('javascript-natural-sort');
const folderElements = require('../elements/folder.js');
const signinElements = require('../elements/signin.js');
const bucketElements = require('../elements/bucket.js');
const navElements = require('../elements/nav.js');
const administratorElements = require('../elements/administrator.js');

describe('Administrator Translation', () => {
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
    browser.driver.manage().window().maximize();
  });

  // TW
  describe('When user into the manage page and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.accountListBtn.getText()).toBe(translate('tw', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserBtn.getText()).toBe(translate('tw', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('tw', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('tw', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('tw', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  describe('When admin into the create account page and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserTitle.getText()).toBe(translate('tw', 'ADMIN_CREATE_ACCOUNT'));
      expect(ad.createUserEmailInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_EMAIL'));
      expect(ad.createUserPasswordInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_PASSWORD'));
      expect(ad.createUserPasswordConfInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelCreateUserBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(ad.checkCreateUserBtn.getText()).toBe(translate('tw', 'UTILS_CREATE'));
    });
  });

  describe('When admin inputs null e-mail,password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys();
      ad.createUserPasswordInput.sendKeys();
      ad.createUserPasswordConfInput.sendKeys();
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.incorrectEmail);
      ad.createUserPasswordInput.sendKeys(env.incorrectPassword);
      ad.createUserPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('tw', 'VALIDATION_EMAIL'));
      expect(ad.createUserPasswordError.getText()).toMatch(translate('tw', 'VALIDATION_MIN_LENGTH'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.adminEmail);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailExist.getText()).toBe(translate('tw', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When admin inputs correct e-mail,password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkCreateUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('tw', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
      expect(ad.createUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin search account and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'MANAGER_SEARCH'));
    });
  });

  describe('When admin reset password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordTitle.getText()).toBe(translate('tw', 'MANAGER_USER_RESET'));
      expect(ad.ResetPasswordPasswordInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_PASSWORD'));
      expect(ad.ResetPasswordPasswordConfInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelResetPasswordBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(ad.checkResetPasswordBtn.getText()).toBe(translate('tw', 'UTILS_CONFIRM'));
    });
  });

  describe('When admin inputs null password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys();
      ad.ResetPasswordPasswordConfInput.sendKeys();
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input error password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toMatch(translate('tw', 'VALIDATION_MIN_LENGTH'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin input correct password and password confirmation and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkResetPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TOAST_RESET_PASSWORD_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When admin click [DELETE ACCOUNT] button and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserTitle.getText()).toBe(translate('tw' , 'MANAGER_DELETE_TITLE'));
      expect(ad.deleteUserCheckMessage.getText()).toMatch(translate('tw' , 'MANAGER_DELETE_CONFIRM'));
      expect(ad.deletePromptMessage.getText()).toBe(translate('tw', 'MANAGER_DELETE_TYPE_NAME'));
      expect(element.all(by.css('label[class="ng-scope"]')).get(1).getText()).toBe(translate('tw', 'MANAGER_DELETE_EMAIL'));
      expect(ad.cancelDeleteUserBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(ad.checkDeleteUserBtn.getText()).toBe(translate('tw', 'UTILS_DELETE'));
    });
  });

  describe('When admin input null email and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys();
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input incorrect email and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.incorrectEmail);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailNonexistent.getText()).toBe(translate('tw', 'MANAGER_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When admin input correct email and selects the Traditional Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TOAST_DELETE_ACCOUNT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // CN
  describe('When user into the manage page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.accountListBtn.getText()).toBe(translate('cn', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.createUserBtn.getText()).toBe(translate('cn', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('cn', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('cn', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('cn', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  describe('When admin into the create account page and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserTitle.getText()).toBe(translate('cn', 'ADMIN_CREATE_ACCOUNT'));
      expect(ad.createUserEmailInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_EMAIL'));
      expect(ad.createUserPasswordInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_PASSWORD'));
      expect(ad.createUserPasswordConfInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelCreateUserBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(ad.checkCreateUserBtn.getText()).toBe(translate('cn', 'UTILS_CREATE'));
    });
  });

  describe('When admin inputs null e-mail,password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys();
      ad.createUserPasswordInput.sendKeys();
      ad.createUserPasswordConfInput.sendKeys();
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.incorrectEmail);
      ad.createUserPasswordInput.sendKeys(env.incorrectPassword);
      ad.createUserPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('cn', 'VALIDATION_EMAIL'));
      expect(ad.createUserPasswordError.getText()).toMatch(translate('cn', 'VALIDATION_MIN_LENGTH'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.adminEmail);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailExist.getText()).toBe(translate('cn', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When admin inputs correct e-mail,password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkCreateUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('cn', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
      expect(ad.createUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin search account and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'MANAGER_SEARCH'));
    });
  });

  describe('When admin reset password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordTitle.getText()).toBe(translate('cn', 'MANAGER_USER_RESET'));
      expect(ad.ResetPasswordPasswordInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_PASSWORD'));
      expect(ad.ResetPasswordPasswordConfInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelResetPasswordBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(ad.checkResetPasswordBtn.getText()).toBe(translate('cn', 'UTILS_CONFIRM'));
    });
  });

  describe('When admin inputs null password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys();
      ad.ResetPasswordPasswordConfInput.sendKeys();
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input error password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toMatch(translate('cn', 'VALIDATION_MIN_LENGTH'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin input correct password and password confirmation and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkResetPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TOAST_RESET_PASSWORD_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When admin click [DELETE ACCOUNT] button and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserTitle.getText()).toBe(translate('cn' , 'MANAGER_DELETE_TITLE'));
      expect(ad.deleteUserCheckMessage.getText()).toMatch(translate('cn' , 'MANAGER_DELETE_CONFIRM'));
      expect(ad.deletePromptMessage.getText()).toBe(translate('cn', 'MANAGER_DELETE_TYPE_NAME'));
      expect(element.all(by.css('label[class="ng-scope"]')).get(1).getText()).toBe(translate('cn', 'MANAGER_DELETE_EMAIL'));
      expect(ad.cancelDeleteUserBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(ad.checkDeleteUserBtn.getText()).toBe(translate('cn', 'UTILS_DELETE'));
    });
  });

  describe('When admin input null email and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys();
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input incorrect email and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.incorrectEmail);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailNonexistent.getText()).toBe(translate('cn', 'MANAGER_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When admin input correct email and selects the Simplified Chinese language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TOAST_DELETE_ACCOUNT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // EN
  describe('When user into the manage page and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.accountListBtn.getText()).toBe(translate('en', 'MANAGER_USER_LIST'));
    });
  });

  describe('When user into the manage page and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(ad.createUserBtn.getText()).toBe(translate('en', 'MANAGER_CREATE_USER'));
      expect(ad.deleteUserBtn.getText()).toBe(translate('en', 'MANAGER_USER_DELETE'));
      expect(ad.resetUserPasswordBtn.getText()).toBe(translate('en', 'MANAGER_USER_RESET'));
      expect(element(by.css('md-input-container[class="flex-gt-sm"]')).element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_SEARCH'));
      expect(ad.userList.element(by.css('th[class="ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_USER_ACCOUNT'));
      expect(ad.userList.element(by.css('th[class="size-width ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_USER_ROLE'));
      // expect(ad.userList.element(by.css('table[class="table table-cursor table-hover"]')).getText()).toBe(translate('en', 'MANAGER_USER_REGISTER_TIME'));
    });
  });

  describe('When admin into the create account page and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserTitle.getText()).toBe(translate('en', 'ADMIN_CREATE_ACCOUNT'));
      expect(ad.createUserEmailInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_EMAIL'));
      expect(ad.createUserPasswordInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_PASSWORD'));
      expect(ad.createUserPasswordConfInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelCreateUserBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(ad.checkCreateUserBtn.getText()).toBe(translate('en', 'UTILS_CREATE'));
    });
  });

  describe('When admin inputs null e-mail,password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys();
      ad.createUserPasswordInput.sendKeys();
      ad.createUserPasswordConfInput.sendKeys();
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.incorrectEmail);
      ad.createUserPasswordInput.sendKeys(env.incorrectPassword);
      ad.createUserPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.createUserEmailInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailError.getText()).toBe(translate('en', 'VALIDATION_EMAIL'));
      expect(ad.createUserPasswordError.getText()).toMatch(translate('en', 'VALIDATION_MIN_LENGTH'));
      expect(ad.createUserPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin inputs incorrect e-mail,password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.adminEmail);
      ad.createUserPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.createUserEmailExist.getText()).toBe(translate('en', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When admin inputs correct e-mail,password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.createUserBtn.click();
      ad.createUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.createUserPasswordInput.sendKeys(env.correctPassword);
      ad.createUserPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkCreateUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('en', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
      expect(ad.createUserForm.isPresent()).toBe(false);
    });
  });

  describe('When admin search account and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en', 'MANAGER_SEARCH'));
    });
  });

  describe('When admin reset password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordTitle.getText()).toBe(translate('en', 'MANAGER_USER_RESET_TITLE'));
      expect(ad.ResetPasswordPasswordInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_PASSWORD'));
      expect(ad.ResetPasswordPasswordConfInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_RETYPE_PASSWORD'));
      expect(ad.cancelResetPasswordBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(ad.checkResetPasswordBtn.getText()).toBe(translate('en', 'UTILS_CONFIRM'));
    });
  });

  describe('When admin inputs null password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys();
      ad.ResetPasswordPasswordConfInput.sendKeys();
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input error password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.incorrectPassword);
      ad.ResetPasswordPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.ResetPasswordPasswordError.getText()).toMatch(translate('en', 'VALIDATION_MIN_LENGTH'));
      expect(ad.ResetPasswordPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_MATCH'));
    });
  });

  describe('When admin input correct password and password confirmation and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.resetUserPasswordBtn.click();
      ad.ResetPasswordPasswordInput.sendKeys(env.correctPassword);
      ad.ResetPasswordPasswordConfInput.sendKeys(env.correctPassword);
      ad.checkResetPasswordBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TOAST_RESET_PASSWORD_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When admin click [DELETE ACCOUNT] button and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserTitle.getText()).toBe(translate('en' , 'MANAGER_DELETE_TITLE'));
      expect(ad.deleteUserCheckMessage.getText()).toMatch(translate('en' , 'MANAGER_DELETE_CONFIRM'));
      expect(ad.deletePromptMessage.getText()).toBe(translate('en', 'MANAGER_DELETE_TYPE_NAME'));
      expect(element.all(by.css('label[class="ng-scope"]')).get(1).getText()).toBe(translate('en', 'MANAGER_DELETE_EMAIL'));
      expect(ad.cancelDeleteUserBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(ad.checkDeleteUserBtn.getText()).toBe(translate('en', 'UTILS_DELETE'));
    });
  });

  describe('When admin input null email and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys();
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When admin input incorrect email and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.incorrectEmail);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      expect(ad.deleteUserEmailNonexistent.getText()).toBe(translate('en', 'MANAGER_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When admin input correct email and selects the English language: ', () => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ad.accountListBtn.click();
      ad.searchUser.sendKeys(env.correctEmailCreate);
      ad.accountListCheckbox.first().click();
      ad.deleteUserBtn.click();
      ad.deleteUserEmailInput.sendKeys(env.correctEmailCreate);
      ad.checkDeleteUserBtn.click();
    });
    it('Should check every elements using the right language', () => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TOAST_DELETE_ACCOUNT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When admin click the [Sign Out] : ',() => {
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
