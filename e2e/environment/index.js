const users = require('./users.js');

function User() {};

User.prototype.setUser = function(user){
  this.correctEmail = users[user]['correctEmail'];
  this.correctEmailCreate = users[user]['correctEmailCreate'];
  this.correctPassword = users[user]['correctPassword'];
  this.incorrectEmail = users[user]['incorrectEmail'];
  this.incorrectPassword = users[user]['incorrectPassword'];
  this.smallImgName1 = users[user]['smallImg']['name'];
  this.smallImgNewName1 = users[user]['smallImg']['newName'];
  this.smallImgPath1 = users[user]['smallImg']['path'];
  this.smallImgSize1 = users[user]['smallImg']['size'];
  this.smallImgName2 = users[user]['smallImg2']['name'];
  this.smallImgPath2 = users[user]['smallImg2']['path'];
  this.smallImgSize2 = users[user]['smallImg2']['size'];
  this.bigImgName = users[user]['bigImg']['name'];
  this.bigImgPath = users[user]['bigImg']['path'];
  this.bigImgSize = users[user]['bigImg']['size'];
  this.bucketName = users[user]['bucketName'];
  this.folderName = users[user]['folderName'];
  this.adminEmail = users[user]['administrator']['email'];
  this.adminPassword = users[user]['administrator']['password'];
};

module.exports = User;
