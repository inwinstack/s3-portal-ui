var environment = require('../environment.js');
var traslate = require('../languages/index.js');

describe('Back to Log in page', () => {
  const signupButton = element(by.css('[href="/auth/signup"]'));
  const signinButton = element(by.css('[href="/auth/signin"]'));

  const env = new environment();

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When user enter this website and click [Log in] : ',() => {
    beforeEach(() => {
      signupButton.click();
      signinButton.click();
    });
    it('Should check this website will go to signin page',() => {
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });
});