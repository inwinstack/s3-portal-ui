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

  this.abImgName = users[user]['abImg']['name'];
  this.abImgPath = users[user]['abImg']['path'];
  this.abcImgName = users[user]['abcImg']['name'];
  this.abcImgPath = users[user]['abcImg']['path'];
  this.abdImgName = users[user]['abdImg']['name'];
  this.abdImgPath = users[user]['abdImg']['path'];
  this.abd1ImgName = users[user]['abd1Img']['name'];
  this.abd1ImgPath = users[user]['abd1Img']['path'];
  this.abd2ImgName = users[user]['abd2Img']['name'];
  this.abd2ImgPath = users[user]['abd2Img']['path'];
  this.abd11ImgName = users[user]['abd11Img']['name'];
  this.abd11ImgPath = users[user]['abd11Img']['path'];
  this.abd22ImgName = users[user]['abd22Img']['name'];
  this.abd22ImgPath = users[user]['abd22Img']['path'];
};

module.exports = User;
