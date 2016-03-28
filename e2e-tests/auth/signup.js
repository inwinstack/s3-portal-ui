var environment = require('../globel_env.js');

describe('Sign up : ',() => {
  const emailInput = element(by.css('[ng-model="signup.credentials.email"]'));
  const passwdInput = element(by.css('[ng-model="signup.credentials.password"]'));
  const passwdConfInput = element(by.css('[ng-model="signup.credentials.password_confirmation"]'));
  const loginPageButton = element(by.css('[href="/auth/signup"]'));
  const signupButton = element(by.css('[ng-click="signup.submit()"]'));
  const env = new environment();

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName+"-"+config.capabilities.os);
  });

  beforeEach(() => {
    browser.get(env.getWeb());
  });

  describe('When users entry this website and click [Create an account] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
    });
    it('Should check title will show that \"Create an account\".',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe('http://10.26.1.63:3000/auth/signup');
      });
    });
  });

  describe('When users not input email 、 password and retype password : ',() => {
    beforeEach(() => {
     loginPageButton.click();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
  });

  describe('When users input null in email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys();
      passwdInput.sendKeys();
      passwdConfInput.sendKeys();
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"You left the field blank.\"',() => {
      element(by.css('[ng-messages="signup.form.email.$error"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-messages="signup.form.email.$error"]')).getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      element(by.css('[ng-messages="signup.form.password.$error"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-messages="signup.form.password.$error"]')).getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
      element(by.css('[ng-messages="signup.form.password_confirmation.$error"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-messages="signup.form.password_confirmation.$error"]')).getText().then((result) => {
        expect(result).toBe('You left the field blank.');
      });
    });
  });

  describe('When users input correct format email : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check icon will done',() => {
      element(by.css('[class="icon-success ng-scope ng-isolate-scope material-icons"]')).getText().then((result) => {
        expect(result).toBe('done');
      });
    });
  });

  describe('When users input incorrect email',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getIncorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"Your email must be look like an e-mail address.\"',() => {
      element(by.css('[ng-if="signup.form.email.$touched"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-if="signup.form.email.$touched"]')).getText().then((result) => {
        expect(result).toBe('Your email must be look like an e-mail address.');
      });
    });
  });

  describe('When users input correct format password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
  });

  describe('When users input incorrect password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getIncorrectPassword());
      passwdConfInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"Please enter at least 6 characters.\"',() => {
      element(by.css('[ng-if="signup.form.password.$touched"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-if="signup.form.password.$touched"]')).getText().then((result) => {
        expect(result).toBe('Please enter at least 6 characters.');
      });
    });
  });

  describe('When users input password and retype password, but they do not match :',() => {
    beforeEach(() => {
      loginPageButton.click();
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getIncorrectPassword());
      emailInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"Please enter the same value again.\"',() => {
      element(by.css('[ng-if="signup.form.password_confirmation.$touched"]')).getAttribute('class').then((result) => {
        expect(result).toContain('ng-active');
      });
      element(by.css('[ng-if="signup.form.password_confirmation.$touched"]')).getText('class').then((result) => {
        expect(result).toBe('Please enter the same value again.');
      });
    });
  });

  describe('When users input correct email 、 password and retype password : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
    });
    it('Should check [SIGN UP] button will enabled',() => {
      expect(signupButton.isEnabled()).toBe(true);
    });
    it('Should check icon will done',() => {
      element(by.css('[class="icon-success ng-scope ng-isolate-scope material-icons"]')).getText().then((result) => {
        expect(result).toBe('done');
      });
    });
  });

  describe('When users input all and click [SIGN UP] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys(env.getCorrectPassword());
      passwdConfInput.sendKeys(env.getCorrectPassword());
      signupButton.click();
    });
    it('Should check message will show that \"Sign Up Success!\" and goto signin page',() => {
      element(by.css('[class="ng-binding flex"]')).getText().then((result) => {
        expect(result).toBe('Sign Up Success!');
      });
      browser.sleep(10000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe('http://10.26.1.63:3000/auth/signin');
      });
    });
  });

  describe('When users input exist email :',() => {
    beforeEach(() => {
      loginPageButton.click();
      emailInput.sendKeys(env.getCorrectEmail());
      passwdInput.sendKeys();
    });
    it('Should check [SIGN UP] button will disabled',() => {
      expect(signupButton.isEnabled()).toBe(false);
    });
    it('Should check message will show that \"Someone already has that username. Try another?\"',() => {
      element(by.css('[ng-show="signup.emailIsInvalid && signup.showEmailCheckedMessage"]')).getAttribute('aria-hidden').then((result) => {
        expect(result).toBe('false');
      });
      element(by.css('[ng-show="signup.emailIsInvalid && signup.showEmailCheckedMessage"]')).getText().then((result) => {
        expect(result).toBe('Someone already has that username. Try another?');
      });
    });
  });
});
