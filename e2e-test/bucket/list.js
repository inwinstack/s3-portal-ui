var environment = require('../environment.js');
var naturalSort = require('javascript-natural-sort');
var traslate = require('../languages/index.js');

describe('Bucket List : ',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));
  const emptyBucketList = element(by.css('[class="empty-state ng-scope layout-align-center-center layout-column"]'));
  const existBucketList = element(by.css('[class="table table-cursor table-hover"]'));
  const menuButton = element.all(by.css('[ng-click="$mdOpenMenu($event)"]'));
  const signoutButton = element(by.css('[ng-click="nav.signOut($event)"]'));
  const leaveButton = element(by.css('[ng-click="dialog.hide()"]'));
  const noBucketMessage = element(by.css('[class="md-headline"]'));
  const noBucketCreateBucket = element(by.css('[ng-click="bucket.createBucket($event)"]'));
  const buckets = element.all(by.css('[ng-repeat="bucket in bucket.data"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user enter account alreay exists buckets : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
    });
    it('Should check the bucket list will displayed.',() => {
      expect(existBucketList.isPresent()).toBe(true);
    });
    it('Should check whether sorted of the new bucket.',() => {
      buckets.getText().then((result) => {
        expect(result).toBe(result.sort(naturalSort));
      });
    });
    afterEach(() => {
      menuButton.then((btns) => {
        btns[0].click();
      });
      signoutButton.click();
      leaveButton.click();
      browser.sleep(1000);
    });
  });

  describe('When user enter account not exist any buckets : ',() => {
  	beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail()+'1');
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
  	});
    it('Should check message will displayed.',() => {
      expect(noBucketMessage.isDisplayed()).toBe(true);
    });
    it('Should check [CREATE BUCKET] will enabled.',() => {
      expect(noBucketCreateBucket.isEnabled()).toBe(true);
    });
    afterEach(() => {
      menuButton.then((btns) => {
        btns[0].click();
      });
      signoutButton.click();
      leaveButton.click();
      browser.sleep(1000);
    });
  });
});