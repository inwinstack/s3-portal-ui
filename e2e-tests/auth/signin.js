var environment = require('../globel_env.js');

describe('Sign in',() => {
  const emailInput = element(by.css('[ng-model="signin.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signin.credentials.password"]'));
  const signinButton = element(by.css('[ng-click="signin.submit()"]'));
  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb());
  });

  describe('When users entry this website : ',() => {
    it('Should check website title is \"Log in to your account\".',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe('http://10.26.1.63:3000/auth/signin');
      });
    });
  });

  describe('When users not input email and password : ',() => {
    it('Should check [SIGN IN] will disabled.',() => {
      expect(signinButton.isEnabled()).toBe(false);
    });
  });

  describe('When users input null in email and password : ',() => {
  	beforeEach(() => {
      emailInput.sendKeys();
      passwdInput.sendKeys();
      emailInput.sendKeys();
  	});
    it('Should check [SIGN IN] will disabled.',() => {
      expect(signinButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"You left the field blank\".',() => {
      element(by.css('[ng-if="signin.form.email.$touched"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-if="signin.form.email.$touched"]')).getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      element(by.css('[ng-if="signin.form.password.$touched"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-if="signin.form.password.$touched"]')).getText().then((result) => {
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
      expect(signinButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"Your email must be look like an e-mail address\".',() => {
      element(by.css('[ng-message="email"]')).getText().then((result) => {
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
    it('Should check message will show that \"Your email or password was incorrect. Please try again\".',() => {
      element(by.css('[class="md-caption text-warn"]')).getText().then((result) => {
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
    it('Should check message will show that \"Your email or password was incorrect. Please try again\".',() => {
      element(by.css('[class="md-caption text-warn"]')).getText().then((result) => {
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
    it('Check message will show that \"Sign in Success.\" and goto Dashboard page',() => {
      element(by.css('[class="ng-binding flex"]')).getText().then((result) => {
        expect(result).toBe('Sign In Success!');
      });
      browser.sleep(5000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe('http://10.26.1.63:3000/dashboard');
        console.log(result);
      });
    });
  });
});