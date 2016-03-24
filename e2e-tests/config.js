exports.config = {
  framework: 'jasmine2',
  specs: ['*.js'],
  multiCapabilities: [{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu-14.04'
  },{
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu-14.04'
  },{
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
  }],
  onPrepare: function() {
    const SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
}