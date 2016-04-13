var environment = require('../globel_env.js');

describe('Back to Log in page', () => {
  const signupButton = element(by.css('[href="/auth/signup"]'));
  const signinButton = element(by.css('[href="/auth/signin"]'));

  const env = new environment();

  beforeEach(() => {
    browser.get(env.getWeb()+'/auth/signin');
  });

  describe('When users enter this website and click [Log in] : ',() => {
    beforeEach(() => {
      signupButton.click();
      signinButton.click();
    });
    it('Should check this website will goto signin page',() => {
      browser.sleep(5000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe(env.getWeb()+'/auth/signin');
      });
    });
  });
});