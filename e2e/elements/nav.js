function elements () {
  this.deleteFileBtn = element(by.css('[ng-click="actionNav.delete()"]'));
  this.checkDeleteFileBtn = element(by.css('[ng-click="dialog.hide()"]'));
  this.downloadBtn = element(by.css('[ng-click="actionNav.download()"]'));
  this.menuBtn = element.all(by.css('[ng-click="$mdOpenMenu($event)"]'));
  this.signoutBtn = element(by.css('[ng-click="topNav.signOut($event)"]'));
  this.toastMessage = element(by.css('[class="ng-binding flex"]'));
  this.loadingIcon = element(by.css('[ng-if="bucket.requesting"]'));
  this.languagesBtn = element.all(by.repeater('language in signin.languages'));
  this.topNavLanguagesBtn = element.all(by.repeater('language in topNav.languages'));
  this.actionNavbarNoneBtn = element(by.css('[ng-click="actionNav.closeSidePanels()"]'));
  this.actionNavbarPropertiesBtn = element.all(by.css('[ng-click="actionNav.openProperties()"]'));
  this.actionNavbarTransfers = element(by.css('[ng-click="actionNav.openTransfers()"]'));
  this.allBucketBtn = element.all(by.repeater('path in bc.paths'));
}

module.exports = elements;
