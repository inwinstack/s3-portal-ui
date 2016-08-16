const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const bucketElements = require('../elements/bucket.js');
const pages = require('../page.js');

describe('Bucket Translation', () => {
  const env = new environment();
  const sie = new signinElements();
  const ne = new navElements();
  const be = new bucketElements();
  const ps = new pages();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  // TW
  describe('When user enters the bucket page and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.createBucketBtn.element(by.css('span[ng-hide="actionNav.isFile()"]')).getText()).toBe(translate('tw', 'BUCKET_CREATE'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'ACTION_NAVBAR_ACTIONS'));
      expect(ne.actionNavbarNoneBtn.getText()).toBe(translate('tw', 'ACTION_NAVBAR_NONE'));
      expect(ne.actionNavbarPropertiesBtn.get(1).element(by.css('[class="ng-scope"]')).getText()).toBe(translate('tw', 'ACTION_NAVBAR_PROPERTIES'));
      expect(ne.actionNavbarTransfers.getText()).toBe(translate('tw', 'ACTION_NAVBAR_TRANSFERS'));
      expect(be.noBucketTitle.getText()).toBe(translate('tw', 'BUCKET_EMPTY_MESSAGE'));
      expect(be.noBucketSubtitle.getText()).toBe(translate('tw', 'BUCKET_CREATE_MESSAGE'));
      expect(be.createBucket.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('tw', 'BUCKET_CREATE'));
    });
  });

  describe('When user opens the create bucket form and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.createBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.bucketForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('tw', 'BUCKET_CREATE_2'));
      expect(be.bucketCreateDescription.getText()).toBe(translate('tw', 'BUCKET_CREATE_DESCRIPTION'));
      expect(be.bucketContent.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('tw', 'BUCKET_NAME'));
      expect(be.bucketFormCancelBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(be.checkCreateBucketBtn.getText()).toBe(translate('tw', 'UTILS_CREATE'));
    });
  });

  describe('When user clicks the [ACTIONS] button form and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.navCreateBucketBtn.getText()).toBe(translate('tw', 'BUCKET_CREATE_2'));
      expect(be.deleteBucketBtn.getText()).toBe(translate('tw', 'BUCKET_DELETE'));
      expect(be.refreshBtn.get(1).getText()).toBe(translate('tw', 'UTILS_REFRESH'));
      expect(be.propertiesBtn.get(1).getText()).toBe(translate('tw', 'ACTION_NAVBAR_PROPERTIES'));
    });
  });

  describe('When user clicks the [ACTIONS] button and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.myAccountBtn.getText()).toBe(translate('tw', 'SETTINGS_ACCOUNT'));
      expect(be.billingAndCostManagementBtn.getText()).toBe(translate('tw', 'SETTINGS_BILLING'));
      expect(be.securityCredentialsBtn.getText()).toBe(translate('tw', 'SETTINGS_SECURITY'));
      expect(ne.signoutBtn.element(by.css('[class="ng-scope"]')).getText()).toBe(translate('tw', 'SETTINGS_SIGN_OUT'));
    });
  });

  describe('When user create already exists bucket name and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys('test');
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TOAST_CREATE_BUCKET_FAILURE'));
      expect(be.bucketDuplicateMessage.getText()).toBe(translate('tw', 'BUCKET_DUPLICATE_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create bucket and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TOAST_CREATE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user open delete bucket form and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketForm.element(by.css('p[class="text-warn ng-scope"]')).getText()).toBe(translate('tw', 'BUCKET_DELETE_DESCRIPTION'));
      expect(be.bucketDeleteConfirm.getText()).toMatch(translate('tw', 'BUCKET_DELETE_CONFIRM'));
      expect(be.bucketDeleteTypeName.getText()).toBe(translate('tw', 'BUCKET_DELETE_TYPE_NAME'));
      expect(be.bucketDelete.getText()).toBe(translate('tw', 'BUCKET_DELETE'));
      expect(be.bucketName.getText()).toBe(translate('tw', 'BUCKET_NAME'));
      expect(be.cancelDeleteBucketBtn.get(1).getText()).toBe(translate('tw', 'UTILS_CANCEL'));
      expect(be.checkDeleteBucket.getText()).toBe(translate('tw', 'UTILS_DELETE'));
    });
  });

  describe('When user input null and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user input not the same bucket name and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('test');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketMessage.getText()).toBe(translate('tw', 'BUCKET_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When user delete bucket and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('tw', 'TOAST_DELETE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // CN
  describe('When user enters the bucket page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.createBucketBtn.element(by.css('span[ng-hide="actionNav.isFile()"]')).getText()).toBe(translate('cn', 'BUCKET_CREATE'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'ACTION_NAVBAR_ACTIONS'));
      expect(ne.actionNavbarNoneBtn.getText()).toBe(translate('cn', 'ACTION_NAVBAR_NONE'));
      expect(ne.actionNavbarPropertiesBtn.get(1).element(by.css('[class="ng-scope"]')).getText()).toBe(translate('cn', 'ACTION_NAVBAR_PROPERTIES'));
      expect(ne.actionNavbarTransfers.getText()).toBe(translate('cn', 'ACTION_NAVBAR_TRANSFERS'));
      expect(be.noBucketTitle.getText()).toBe(translate('cn', 'BUCKET_EMPTY_MESSAGE'));
      expect(be.noBucketSubtitle.getText()).toBe(translate('cn', 'BUCKET_CREATE_MESSAGE'));
      expect(be.createBucket.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('cn', 'BUCKET_CREATE'));
    });
  });

  describe('When user opens the create bucket form and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.createBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.bucketForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('cn', 'BUCKET_CREATE_2'));
      expect(be.bucketCreateDescription.getText()).toBe(translate('cn', 'BUCKET_CREATE_DESCRIPTION'));
      expect(be.bucketContent.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('cn', 'BUCKET_NAME'));
      expect(be.bucketFormCancelBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(be.checkCreateBucketBtn.getText()).toBe(translate('cn', 'UTILS_CREATE'));
    });
  });

  describe('When user clicks the [ACTIONS] button form and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.navCreateBucketBtn.getText()).toBe(translate('cn', 'BUCKET_CREATE_2'));
      expect(be.deleteBucketBtn.getText()).toBe(translate('cn', 'BUCKET_DELETE'));
      expect(be.refreshBtn.get(1).getText()).toBe(translate('cn', 'UTILS_REFRESH'));
      expect(be.propertiesBtn.get(1).getText()).toBe(translate('cn', 'ACTION_NAVBAR_PROPERTIES'));
    });
  });

  describe('When user clicks the [ACTIONS] button and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      ne.menuBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.myAccountBtn.getText()).toBe(translate('cn', 'SETTINGS_ACCOUNT'));
      expect(be.billingAndCostManagementBtn.getText()).toBe(translate('cn', 'SETTINGS_BILLING'));
      expect(be.securityCredentialsBtn.getText()).toBe(translate('cn', 'SETTINGS_SECURITY'));
      expect(ne.signoutBtn.element(by.css('[class="ng-scope"]')).getText()).toBe(translate('cn', 'SETTINGS_SIGN_OUT'));
    });
  });

  describe('When user create already exists bucket name and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys('test');
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TOAST_CREATE_BUCKET_FAILURE'));
      expect(be.bucketDuplicateMessage.getText()).toBe(translate('cn', 'BUCKET_DUPLICATE_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create bucket and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TOAST_CREATE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user open delete bucket form and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketForm.element(by.css('p[class="text-warn ng-scope"]')).getText()).toBe(translate('cn', 'BUCKET_DELETE_DESCRIPTION'));
      expect(be.bucketDeleteConfirm.getText()).toMatch(translate('cn', 'BUCKET_DELETE_CONFIRM'));
      expect(be.bucketDeleteTypeName.getText()).toBe(translate('cn', 'BUCKET_DELETE_TYPE_NAME'));
      expect(be.bucketDelete.getText()).toBe(translate('cn', 'BUCKET_DELETE'));
      expect(be.bucketName.getText()).toBe(translate('cn', 'BUCKET_NAME'));
      expect(be.cancelDeleteBucketBtn.get(1).getText()).toBe(translate('cn', 'UTILS_CANCEL'));
      expect(be.checkDeleteBucket.getText()).toBe(translate('cn', 'UTILS_DELETE'));
    });
  });

  describe('When user input null and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user input not the same bucket name and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('test');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketMessage.getText()).toBe(translate('cn', 'BUCKET_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When user delete bucket and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(2).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('cn', 'TOAST_DELETE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // EN
  describe('When user enters the bucket page and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.createBucketBtn.element(by.css('span[ng-hide="actionNav.isFile()"]')).getText()).toBe(translate('en', 'BUCKET_CREATE_2'));
      expect(ne.menuBtn.get(2).element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'ACTION_NAVBAR_ACTIONS'));
      expect(ne.actionNavbarNoneBtn.getText()).toBe(translate('en', 'ACTION_NAVBAR_NONE'));
      expect(ne.actionNavbarPropertiesBtn.get(1).element(by.css('[class="ng-scope"]')).getText()).toBe(translate('en', 'ACTION_NAVBAR_PROPERTIES'));
      expect(ne.actionNavbarTransfers.getText()).toBe(translate('en', 'ACTION_NAVBAR_TRANSFERS'));
      expect(be.noBucketTitle.getText()).toBe(translate('en', 'BUCKET_EMPTY_MESSAGE'));
      expect(be.noBucketSubtitle.getText()).toBe(translate('en', 'BUCKET_CREATE_MESSAGE'));
      expect(be.createBucket.element(by.css('span[class="ng-scope"]')).getText()).toBe(translate('en', 'BUCKET_CREATE_2'));
    });
  });

  describe('When user opens the create bucket form and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.createBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.bucketForm.element(by.css('h2[class="ng-scope"]')).getText()).toBe(translate('en', 'BUCKET_CREATE'));
      expect(be.bucketCreateDescription.getText()).toBe(translate('en', 'BUCKET_CREATE_DESCRIPTION'));
      expect(be.bucketContent.element(by.css('label[class="ng-scope"]')).getText()).toBe(translate('en', 'BUCKET_NAME'));
      expect(be.bucketFormCancelBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(be.checkCreateBucketBtn.getText()).toBe(translate('en', 'UTILS_CREATE'));
    });
  });

  describe('When user clicks the [ACTIONS] button form and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.navCreateBucketBtn.getText()).toBe(translate('en', 'BUCKET_CREATE'));
      expect(be.deleteBucketBtn.getText()).toBe(translate('en', 'BUCKET_DELETE'));
      expect(be.refreshBtn.get(1).getText()).toBe(translate('en', 'UTILS_REFRESH'));
      expect(be.propertiesBtn.get(1).getText()).toBe(translate('en', 'ACTION_NAVBAR_PROPERTIES_2'));
    });
  });

  describe('When user clicks the [ACTIONS] button and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.myAccountBtn.getText()).toBe(translate('en', 'SETTINGS_ACCOUNT'));
      expect(be.billingAndCostManagementBtn.getText()).toBe(translate('en', 'SETTINGS_BILLING'));
      expect(be.securityCredentialsBtn.getText()).toBe(translate('en', 'SETTINGS_SECURITY'));
      expect(ne.signoutBtn.element(by.css('[class="ng-scope"]')).getText()).toBe(translate('en', 'SETTINGS_SIGN_OUT'));
    });
  });

  describe('When user create already exists bucket name and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys('test');
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TOAST_CREATE_BUCKET_FAILURE'));
      expect(be.bucketDuplicateMessage.getText()).toBe(translate('en', 'BUCKET_DUPLICATE_MESSAGE'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user create bucket and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.createBucketBtn.click();
      be.createBucketInput.sendKeys(env.bucketName);
      be.checkCreateBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TOAST_CREATE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user open delete bucket form and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketForm.element(by.css('p[class="text-warn ng-scope"]')).getText()).toBe(translate('en', 'BUCKET_DELETE_DESCRIPTION'));
      expect(be.bucketDeleteConfirm.getText()).toMatch(translate('en', 'BUCKET_DELETE_CONFIRM'));
      expect(be.bucketDeleteTypeName.getText()).toBe(translate('en', 'BUCKET_DELETE_TYPE_NAME'));
      expect(be.bucketDelete.getText()).toBe(translate('en', 'BUCKET_DELETE'));
      expect(be.bucketName.getText()).toBe(translate('en', 'BUCKET_NAME'));
      expect(be.cancelDeleteBucketBtn.get(1).getText()).toBe(translate('en', 'UTILS_CANCEL'));
      expect(be.checkDeleteBucket.getText()).toBe(translate('en', 'UTILS_DELETE'));
    });
  });

  describe('When user input null and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user input not the same bucket name and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys('test');
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      expect(be.deleteBucketMessage.getText()).toBe(translate('en', 'BUCKET_DELETE_ERROR_MESSAGE'));
    });
  });

  describe('When user delete bucket and selects the English language: ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      be.bucketCheckbox.first().click();
      ne.menuBtn.get(2).click();
      be.deleteBucketBtn.click();
      be.deleteBucketInput.sendKeys(env.bucketName);
      be.checkDeleteBucket.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toMatch(translate('en', 'TOAST_DELETE_BUCKET_SUCCESS'));
      browser.ignoreSynchronization = false;
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
