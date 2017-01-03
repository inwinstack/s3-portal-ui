const environment = require('../environment/index.js');
const signinElements = require('../elements/signin.js');
const signupElememts = require('../elements/signup.js');
const navElements = require('../elements/nav.js');
const translate = require('../languages/index.js');
const pages = require('../page.js');

describe('Auth Translation', () => {
  const env = new environment();
  const sie = new signinElements();
  const sue = new signupElememts();
  const ne = new navElements();
  const ps = new pages();

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  browser.getProcessedConfig().then((config) => {
    env.setUser(config.capabilities.browserName + "-" + config.capabilities.os);
  });

  // TW
  describe('When user enters the login page and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.loginToYourAccount.getText()).toBe(translate('tw', 'AUTH_LOGIN_TO_YOUR_ACCOUNT'));
      expect(sie.emailInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_EMAIL'));
      expect(sie.passwordInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_PASSWORD'));
      expect(sie.signinBtn.getText()).toBe(translate('tw', 'AUTH_SIGN_IN'));
      expect(sie.haveNotAccount.getText()).toBe(translate('tw', 'AUTH_HAVE_NOT_ACCOUNT'));
      expect(sie.signupBtn.getText()).toBe(translate('tw', 'AUTH_CREATE_ACCOUNT'));
    });
  });

  describe('When user enters the sign up page and selects the Traditional Chinese language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.createAccount.getText()).toBe(translate('tw', 'AUTH_CREATE_ACCOUNT'));
      expect(sue.signupEmailInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_EMAIL'));
      expect(sue.signupPasswordInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_PASSWORD'));
      expect(sue.signupPasswordConfInput.getAttribute('placeholder')).toBe(translate('tw', 'AUTH_RETYPE_PASSWORD'));
      expect(sue.checkSignUpBtn.getText()).toBe(translate('tw', 'AUTH_SIGN_UP'));
      expect(sue.haveAccount.getText()).toBe(translate('tw', 'AUTH_HAVE_ACCOUNT'));
      expect(sue.backSignin.getText()).toBe(translate('tw', 'AUTH_SIGN_IN'));
    });
  });

  describe('When user inputs null in the account and password and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys();
      sue.signupPasswordInput.sendKeys();
      sue.signupPasswordConfInput.sendKeys();
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user inputs the incorrect format for e-mail and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.incorrectEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('tw', 'VALIDATION_EMAIL'));
    });
  });

  describe('When user inputs the incorrect format for password and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.incorrectPassword);
      sue.signupPasswordConfInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordError.getText()).toMatch(translate('tw', 'VALIDATION_MIN_LENGTH'));
    });
  });

  describe('When user inputs the password and confirmation is inconsistent and selects the Traditional Chinese language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.incorrectPassword);
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordConfError.getText()).toBe(translate('tw', 'VALIDATION_MATCH'));
    });
  });

  describe('When user inputs the e-mail, password and confirmation and clicks the [SIGN UP] and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail + '1');
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.correctPassword);
      sue.checkSignUpBtn.click();
    });
    it('Should check every elements using the right language : ',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('tw', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user inputs an already existing e-mail and selects the Traditional Chinese language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailExist.getText()).toBe(translate('tw', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When user inputs null in the account and password and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.emailInput.sendKeys();
      sie.passwordInput.sendKeys();
      sie.emailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.emailInputError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
      expect(sie.passwordInputError.getText()).toBe(translate('tw', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When the user inputs the correct email and password, but the email does not exist and clicks the [SIGN IN] and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.emailInput.sendKeys(env.correctEmail + '2');
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('tw', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user inputs exist email but input not match password and clicks the [SIGN IN] and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.incorrectPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('tw', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user input the correct email and password and clicks the [SIGN IN] and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(1).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('tw', 'TOAST_SIGN_IN_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user clicks the [Sign Out] and selects the Traditional Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      expect(ne.toastMessage.getText()).toBe(translate('tw', 'TOAST_SIGN_OUT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // CN
  describe('When user enters the login page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.loginToYourAccount.getText()).toBe(translate('cn', 'AUTH_LOGIN_TO_YOUR_ACCOUNT'));
      expect(sie.emailInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_EMAIL'));
      expect(sie.passwordInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_PASSWORD'));
      expect(sie.signinBtn.getText()).toBe(translate('cn', 'AUTH_SIGN_IN'));
      expect(sie.haveNotAccount.getText()).toBe(translate('cn', 'AUTH_HAVE_NOT_ACCOUNT'));
      expect(sie.signupBtn.getText()).toBe(translate('cn', 'AUTH_CREATE_ACCOUNT'));
    });
  });

  describe('When user enters the sign up page and selects the Simplified Chinese language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.createAccount.getText()).toBe(translate('cn', 'AUTH_CREATE_ACCOUNT'));
      expect(sue.signupEmailInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_EMAIL'));
      expect(sue.signupPasswordInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_PASSWORD'));
      expect(sue.signupPasswordConfInput.getAttribute('placeholder')).toBe(translate('cn', 'AUTH_RETYPE_PASSWORD'));
      expect(sue.checkSignUpBtn.getText()).toBe(translate('cn', 'AUTH_SIGN_UP'));
      expect(sue.haveAccount.getText()).toBe(translate('cn', 'AUTH_HAVE_ACCOUNT'));
      expect(sue.backSignin.getText()).toBe(translate('cn', 'AUTH_SIGN_IN'));
    });
  });

  describe('When user inputs null in the account and password and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys();
      sue.signupPasswordInput.sendKeys();
      sue.signupPasswordConfInput.sendKeys();
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user inputs the incorrect format for e-mail and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.incorrectEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('cn', 'VALIDATION_EMAIL'));
    });
  });

  describe('When user inputs the incorrect format for password and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.incorrectPassword);
      sue.signupPasswordConfInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordError.getText()).toMatch(translate('cn', 'VALIDATION_MIN_LENGTH'));
    });
  });

  describe('When user inputs the password and confirmation is inconsistent and selects the Simplified Chinese language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.incorrectPassword);
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordConfError.getText()).toBe(translate('cn', 'VALIDATION_MATCH'));
    });
  });

  describe('When user inputs the e-mail, password and confirmation and clicks the [SIGN UP] and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail + '3');
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.correctPassword);
      sue.checkSignUpBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('cn', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user inputs an already existing e-mail and selects the Simplified Chinese language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailExist.getText()).toBe(translate('cn', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When user inputs null in the account and password and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.emailInput.sendKeys();
      sie.passwordInput.sendKeys();
      sie.emailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.emailInputError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
      expect(sie.passwordInputError.getText()).toBe(translate('cn', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When the user inputs the correct email and password, but the email does not exist and clicks the [SIGN IN] and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.emailInput.sendKeys(env.correctEmail + '4');
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('cn', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user inputs exist email but input not match password and clicks the [SIGN IN] and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.incorrectPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('cn', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user input the correct email and password and clicks the [SIGN IN] and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(2).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('cn', 'TOAST_SIGN_IN_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user clicks the [Sign Out] and selects the Simplified Chinese language : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(1).click();
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      expect(ne.toastMessage.getText()).toBe(translate('cn', 'TOAST_SIGN_OUT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  // EN
  describe('When user enters the login page and selects the English language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.loginToYourAccount.getText()).toBe(translate('en', 'AUTH_LOGIN_TO_YOUR_ACCOUNT'));
      expect(sie.emailInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_EMAIL'));
      expect(sie.passwordInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_PASSWORD'));
      expect(sie.signinBtn.getText()).toBe(translate('en', 'AUTH_SIGN_IN'));
      expect(sie.haveNotAccount.getText()).toBe(translate('en', 'AUTH_HAVE_NOT_ACCOUNT'));
      expect(sie.signupBtn.getText()).toBe(translate('en', 'AUTH_CREATE_ACCOUNT'));
    });
  });

  describe('When user enters the sign up page and selects the English language: ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.createAccount.getText()).toBe(translate('en', 'AUTH_CREATE_ACCOUNT'));
      expect(sue.signupEmailInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_EMAIL'));
      expect(sue.signupPasswordInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_PASSWORD'));
      expect(sue.signupPasswordConfInput.getAttribute('placeholder')).toBe(translate('en', 'AUTH_RETYPE_PASSWORD'));
      expect(sue.checkSignUpBtn.getText()).toBe(translate('en', 'AUTH_SIGN_UP'));
      expect(sue.haveAccount.getText()).toBe(translate('en', 'AUTH_HAVE_ACCOUNT'));
      expect(sue.backSignin.getText()).toBe(translate('en', 'AUTH_SIGN_IN_2'));
    });
  });

  describe('When user inputs null in the account and password and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys();
      sue.signupPasswordInput.sendKeys();
      sue.signupPasswordConfInput.sendKeys();
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(sue.signupPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When user inputs the incorrect format for e-mail and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.incorrectEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailError.getText()).toBe(translate('en', 'VALIDATION_EMAIL'));
    });
  });

  describe('When user inputs the incorrect format for password and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.incorrectPassword);
      sue.signupPasswordConfInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordError.getText()).toMatch(translate('en', 'VALIDATION_MIN_LENGTH'));
    });
  });

  describe('When user inputs the password and confirmation is inconsistent and selects the English language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.incorrectPassword);
      sue.signupEmailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupPasswordConfError.getText()).toBe(translate('en', 'VALIDATION_MATCH'));
    });
  });

  describe('When user inputs the e-mail, password and confirmation and clicks the [SIGN UP] and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail + '5');
      sue.signupPasswordInput.sendKeys(env.correctPassword);
      sue.signupPasswordConfInput.sendKeys(env.correctPassword);
      sue.checkSignUpBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('en', 'TOAST_SIGN_UP_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user inputs an already existing e-mail and selects the English language :',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.signupBtn.click();
      sue.signupEmailInput.sendKeys(env.correctEmail);
      sue.signupPasswordInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sue.signupEmailExist.getText()).toBe(translate('en', 'AUTH_ALREADY_EXIST'));
    });
  });

  describe('When user inputs null in the account and password and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.emailInput.sendKeys();
      sie.passwordInput.sendKeys();
      sie.emailInput.sendKeys();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.emailInputError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
      expect(sie.passwordInputError.getText()).toBe(translate('en', 'VALIDATION_REQUIRED'));
    });
  });

  describe('When the user inputs the correct email and password, but the email does not exist and clicks the [SIGN IN] and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.emailInput.sendKeys(env.correctEmail + '6');
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('en', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user inputs exist email but input not match password and clicks the [Sign In] and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.incorrectPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      expect(sie.signinStatus.getText()).toBe(translate('en', 'AUTH_SIGN_IN_INCORRECT'));
    });
  });

  describe('When user input the correct email and password and clicks the [SIGN IN] and selects the English language : ',() => {
    beforeEach(() => {
      ne.languagesBtn.get(0).click();
      sie.emailInput.sendKeys(env.correctEmail);
      sie.passwordInput.sendKeys(env.correctPassword);
      sie.signinBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(1000);
      expect(ne.toastMessage.getText()).toBe(translate('en', 'TOAST_SIGN_IN_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });

  describe('When user clicks the [Sign Out] : ',() => {
    beforeEach(() => {
      ne.menuBtn.get(1).click();
      ne.topNavLanguagesBtn.get(0).click();
      ne.menuBtn.first().click();
      ne.signoutBtn.click();
    });
    it('Should check every elements using the right language',() => {
      browser.ignoreSynchronization = true;
      browser.sleep(500);
      expect(ne.toastMessage.getText()).toBe(translate('en', 'TOAST_SIGN_OUT_SUCCESS'));
      browser.ignoreSynchronization = false;
    });
  });
});
