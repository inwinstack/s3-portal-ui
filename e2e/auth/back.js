const signinElements = require('../elements/signin.js');
const signupElememts = require('../elements/signup.js');
const pages = require('../page.js');

describe('Back to Log in page', () => {
  const sie = new signinElements();
  const sue = new signupElememts();
  const ps = new pages();

  beforeEach(() => {
    browser.get(ps.signInPage);
    browser.driver.manage().window().maximize();
  });

  describe('When user enters this website and click [Log in] : ',() => {
    beforeEach(() => {
      sie.signupBtn.click();
      sue.backSignin.click();
    });
    it('Should check this website is go to signin page',() => {
      expect(browser.getCurrentUrl()).toBe(ps.signInPage);
    });
  });
});
