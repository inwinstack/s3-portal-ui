exports.config = {
  framework: 'jasmine2',
  specs: [
    './auth/signup.js',
    './auth/signin.js',
    './auth/back.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu-14.04'
  }
  ,{
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu-14.04'
  }
  ,{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'win7'
  },{
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'win7'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
    os: 'win8'
  },{
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
    os: 'win8'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
    os: 'win10'
  },{
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
    os: 'win10'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    os: 'osx'
  },{
    browserName: 'firefox',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    os: 'osx'
  },{
    browserName: 'safari',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    os: 'osx'
  }
  ],
  onPrepare: function() {
    const SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
}