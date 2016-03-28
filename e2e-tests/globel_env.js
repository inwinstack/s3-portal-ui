function User() {
  this.correctEmail = 'no';
  this.incorrectEmail = 'no';
  this.correctpassword = 'password';
  this.incorrectPassword = 'pass';
  this.web = 'http://10.26.1.63:3000/auth/signin'
};

var array = {
  'chrome-ubuntu-14.04': 'chrome-ubuntu-14.04@inwinstack.com,chrome-ubuntu-14.04',
  'firefox-ubuntu-14.04': 'firefox-ubuntu-14.04@inwinstack.com,firefox-ubuntu-14.04',
  'chrome-win7': 'chrome-win7@inwinstack.com,chrome-win7',
  'firefox-win7': 'firefox-win7@inwinstack.com,firefox-win7',
  'internet explorer-win7': 'ie-win7@inwinstack.com,ie-win7',
  'chrome-win8': 'chrome-win8@inwinstack.com,chrome-win8',
  'firefox-win8': 'firefox-win8@inwinstack.com,firefox-win8',
  'internet explorer-win8': 'ie-win8@inwinstack.com,ie-win8',
  'chrome-win10': 'chrome-win10@inwinstack.com,chrome-win10',
  'firefox-win10': 'firefox-win10@inwinstack.com,firefox-win10',
  'internet explorer-win10': 'ie-win10@inwinstack.com,ie-win10',
  'chrome-osx': 'chrome-osx@inwinstack.com,chrome-osx',
  'firefox-osx': 'firefox-osx@inwinstack.com,firefox-osx',
  'safari-osx': 'safari-osx@inwinstack.com,safari-osx'
};

User.prototype.getWeb = function(){
  return this.web;
};

User.prototype.setUser = function(user){
  this.correctEmail = array[user].split(',')[0];
  this.incorrectEmail = array[user].split(',')[1];
};

User.prototype.getCorrectEmail = function(){
  return this.correctEmail;
};

User.prototype.getIncorrectEmail = function(){
  return this.incorrectEmail;
};

User.prototype.getCorrectPassword = function(){
  return this.correctpassword;
};

User.prototype.getIncorrectPassword = function(){
  return this.incorrectPassword;
};

module.exports = User;
