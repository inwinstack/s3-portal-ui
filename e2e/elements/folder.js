function elements () {
  this.createFolderBtn = element.all(by.css('button[ng-click="actionNav.createFolder($event)"]'));
  this.createFolderForm = element(by.css('md-dialog[aria-label="Create Folder Dialog"]'));
  this.createFolderInput = element(by.name('folder'));
  this.checkCreateFolderBtn = element(by.css('[ng-click="create.create()"]'));
  this.cancelFormBtn = element.all(by.css('[ng-click="create.cancel()"]'));
  this.folderList = element.all(by.repeater('f in file.data'));
  this.folderExistMessage = element(by.css('[ng-show="create.duplicated"]'));
  this.folderCheckbox = element.all(by.css('[ng-checked="f.checked"]'));
  this.folderContainer = element(by.css('md-input-container[class="md-block md-input-has-value"]'));
  this.checkDeleteFolderBtn = element(by.css('[ng-click="dialog.hide()"]'));
}

module.exports = elements;
