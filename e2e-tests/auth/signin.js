var environment = require('../globel_env.js');

describe('Sign in',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));
  const emailMessage = element(by.css('[ng-messages="signin.form.email.$error"]'));
  const passwordMessage = element(by.css('[ng-messages="signin.form.password.$error"]'));
  const loginStatus = element(by.css('[ng-show="signin.incorrect"]'));
  const loginMessage = element(by.css('[class="ng-binding flex"]'));

  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When users enter this website : ',() => {
    it('Should check goto website that title is \"Log in to your account\".',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });

  describe('When users not input email and password : ',() => {
    it('Should check [SIGN IN] will disabled.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
  });

  describe('When users input null in email and password : ',() => {
  	beforeEach(() => {
      emailInput.sendKeys();
      passwdInput.sendKeys();
      emailInput.sendKeys();
  	});
    it('Should check [SIGN IN] will disabled.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show \"You left the field blank\".',() => {
      expect(emailMessage.isDisplayed()).toBe(true);
      emailMessage.getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      expect(passwordMessage.isDisplayed()).toBe(true);
      passwordMessage.getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
    });
  });

  describe('When users input incorrect format email : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getIncorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN IN] button will disabled.',() => {
      expect(signinButton.isEnabled()).not.toBe(true);
    });
    it('Should check message will show that \"Your email must be look like an e-mail address\".',() => {
      emailMessage.getText().then((result) => {
        expect(result).toBe('Your email must be look like an e-mail address.');
      });
    });
  });

  describe('When users input correct format but not register email : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getIncorrectEmail()+'@gmail.com');
      passwdInput.sendKeys('passwd');
      signinButton.click();
    });
    it('Should check [SIGN IN] will enabled.',() => {
      expect(signinButton.isEnabled()).toBe(true);
    });
    it('Should check message will show \"Your email or password was incorrect. Please try again\".',() => {
      loginStatus.getText().then((result) => {
        expect(result).toBe('Your email or password was incorrect. Please try again.');
      });
    });
  });

  describe('When users input exist email but input incorrect password : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getIncorrectPassword());
      signinButton.click();
    });
    it('Should check [SIGN IN] button will enabled.',() => {
      expect(signinButton.isEnabled()).toBe(true);
    });
    it('Should check message will show \"Your email or password was incorrect. Please try again\".',() => {
      loginStatus.getText().then((result) => {
        expect(result).toBe('Your email or password was incorrect. Please try again.');
      });
    });
  });

  describe('When users input correct email and password : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
    });

    it('Should check [SIGN IN] will enabled.',() => {
      expect(signinButton.isEnabled()).toBe(true);
    });
  });

  describe('When users input all and click [SIGN IN] : ',() => {
    beforeEach(() => {
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      signinButton.click();
    });
    it('Check message will show \"Sign in Success.\" and goto Dashboard page',() => {
      loginMessage.getText().then((result) => {
        expect(result).toBe('Sign In Success!');
      });
      browser.sleep(5000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/dashboard');
      });
    });
  });
});