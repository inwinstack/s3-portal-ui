exports.config = {
  framework: 'jasmine2',
  specs: [
   './administrator/list.js',
   './administrator/createUser.js',
   './administrator/search.js',
   './administrator/resetPassword.js',
   './administrator/delete.js',
   './administrator/translation.js',
   './auth/signup.js',
   './auth/signin.js',
   './auth/signout.js',
   './auth/back.js',
   './auth/translation.js',
   './bucket/list.js',
   './bucket/create.js',
   './bucket/delete.js',
   './bucket/translation.js',
   './file/properties.js',
   './file/rename.js',
   './file/list.js',
   './file/upload.js',
   './file/status.js',
   './file/download.js',
   './file/delete.js',
   './file/translation.js',
   './folder/create.js',
   './folder/translation.js',
  ],
  multiCapabilities: [
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.180:4444/wd/hub',
    os: 'ubuntu'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.147:4444/wd/hub',
    os: 'win7'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
    os: 'win8'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
    os: 'win10'
  },{
    browserName: 'chrome',
    seleniumAddress: 'http://10.21.20.142:4444/wd/hub',
    os: 'mac'
  }],
  onPrepare: function() {
    const jasmineReporters = require('jasmine-reporters');
    return browser.getProcessedConfig().then(function(config) {
      const junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: './reports',
        filePrefix: config.capabilities.browserName + "-" + config.capabilities.os,
      });
      jasmine.getEnv().addReporter(junitReporter);
    });
  },
}
