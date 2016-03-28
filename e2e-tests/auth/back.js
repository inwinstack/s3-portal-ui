var environment = require('../globel_env.js');

describe('Back Log in page', () => {
  const env = new environment();

  beforeEach(() => {
    browser.get(env.getWeb());
  });

  describe('When users entry this website and click [Log in] : ',() => {
    beforeEach(() => {
      element(by.css('[href="/auth/signup"]')).click();
      element(by.css('[href="/auth/signin"]')).click();
    });
    it('Should check this website will goto signin page', function () {
      browser.sleep(5000);
      browser.getCurrentUrl().then((result) => {
        expect(result).toBe('http://10.26.1.63:3000/auth/signin');
      });
    });
  });
});