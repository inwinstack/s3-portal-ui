var environment = require('../environment.js');
var naturalSort = require('javascript-natural-sort');
var traslate = require('../languages/index.js');

describe('Create Bucket',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));
  const createBucketButton = element.all(by.css('[ng-click="nav.createBucket($event)"]'));
  const createForm = element(by.css('[name="create.form"]'));
  const cancelButton = element.all(by.css('[ng-click="create.cancel()"]'));
  const createButton = element(by.css('[ng-click="create.create()"]'));
  const bucketNameInput = element(by.css('[ng-model="create.bucket"]'));
  const buckets = element.all(by.css('[ng-repeat="bucket in bucket.data"]'));
  const date = new Date();
  const fileName = date.getYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user clicked [CREATE BUCKET] : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
      createBucketButton.then((btns) => {
        btns[0].click();
      });
    });
    it('Should check Create Bucket form will displayed and [CREATE] will disabled.',() => {
      expect(createForm.isDisplayed()).toBe(true);
      expect(createButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When user click [CREATE BUCKET] and click [CANCEL]  : ',() => {
    beforeEach(() => {
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      cancelButton.then((btns) => {
        btns[1].click();
      });
    });
    it('Should check hide Create Bucket form.',() => {
      expect(createForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user click [CREATE BUCKET] and click [x] : ',() => {
    beforeEach(() => {
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      cancelButton.then((btns) => {
        btns[0].click();
      });
    });
    it('Should check hide Create Bucket form.',() => {
      expect(createForm.isPresent()).not.toBe(true);
    });
  });

  describe('When user input null in Bucket Name : ',() => {
    beforeEach(() => {
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      bucketNameInput.sendKeys();
      createForm.click();
    });
    it('Should check message will displayed and [CREATE] will disabled.',() => {
      expect(element(by.css('div[ng-messages="create.form.bucket.$error"]')).isDisplayed()).toBe(true);
      expect(createButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When user input correct bucket name in Bucket Name : ',() => {
    beforeEach(() => {
      const date = new Date();
      const fileName = date.getYear()+'/'+date.getMonth()+'/'+date.getDay()+'-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      bucketNameInput.sendKeys(fileName);
      createForm.click();
    });
    it('Should check message not displayed and [CREATE] is enabled.',() => {
      expect(element(by.css('div[ng-messages="create.form.bucket.$error"]')).isDisplayed()).not.toBe(true);
      expect(createButton.isEnabled()).toBe(true);
    });
  });

  describe('When user input correct bucket name and click [CREATE] : ',() => {
    beforeEach(() => {
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      bucketNameInput.sendKeys(env.getIncorrectEmail()+'-'+fileName);
      createButton.click();
      buckets.getText().then((result) => {
        expect(result).toContain('info_outline '+env.getIncorrectEmail()+'-'+fileName);
      });
    });
    it('Should check whether sorted of the new bucket.',() => {
      buckets.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
    });
    it('Should check message will displayed and the new Bucket in list.',() => {
      buckets.getText().then((result) => {
        expect(result).toContain('info_outline '+env.getIncorrectEmail()+'-'+fileName);
      });
    });
  });

  describe('When user input correct bucket name but this name already exists : ',() => {
    beforeEach(() => {
      createBucketButton.then((btns) => {
        btns[0].click();
      });
      buckets.getText().then((result) => {
        bucketNameInput.sendKeys(env.getIncorrectEmail()+'-'+fileName);
      });
      createButton.click();
    });
    it('Should check message will displayed and [CREATE] will disabled.',() => {
      expect(element(by.css('[ng-show="create.duplicated &&  ! create.checking && create.checked"]')).isDisplayed()).toBe(true);
      expect(createButton.isEnabled()).not.toBe(true);
    });
  });
});