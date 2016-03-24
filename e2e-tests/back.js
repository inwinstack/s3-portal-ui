var environment = require('./environment.js');

describe('Back Log in page', () => {
  const loginPageButton = element(by.css('[href="/auth/signup"]'));
  const backButton = element(by.css('[href="/auth/signin"]'));
  const env = new environment();

  beforeEach(() => {
    browser.get(env.getWeb());
  });

  describe('When users entry this website and click [Log in] : ',() => {
    beforeEach(() => {
      loginPageButton.click();
      backButton.click();
    });

    it('Check title is show  that \" Log in to your account. \"', function () {
      element.all(by.css('[class="text-center md-subheader"]')).getText().then((result) => {
        expect(result).toContain('Log in to your account');
      });
    });
  });
});