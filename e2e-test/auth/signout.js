var environment = require('../environment.js');
var traslate = require('../languages/index.js');

describe('Sign Out',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));
  const menuButton = element.all(by.css('[ng-click="$mdOpenMenu($event)"]'));
  const signoutButton = element(by.css('[ng-click="nav.signOut($event)"]'));
  const stayButton = element(by.css('[ng-click="dialog.abort()"]'));
  const leaveButton = element(by.css('[ng-click="dialog.hide()"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user click [Sign Out] and double check selected [STAY] : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
      menuButton.then((btns) => {
        btns[0].click();
      });
      signoutButton.click();
      stayButton.click();
    });
    it('Should check this website will stay Bucket List page.',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/bucket');
      });
    });
  });

  describe('When user click [Sign Out] and double check selected [LEAVE] : ',() => {
    beforeEach(() => {
      menuButton.then((btns) => {
        btns[0].click();
      });
      signoutButton.click();
      leaveButton.click();
    });
    it('Should check this website will go to Sign In page.',() => {
      expect(element(by.css('md-toast')).isDisplayed()).toBe(true);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });

  describe('When user logout and input URL to attempts to back Bucket list : ',() => {
    beforeEach(() => {
      browser.navigate().to(env.getWeb()+'/bucket');
    });
    it('Should check stay Sign in page.',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });
});