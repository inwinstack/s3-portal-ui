function elements () {
  this.replicateCancelBtn = element(by.css('[ng-click="dialog.abort()"]'));
  this.replicateConfirmBtn = element(by.css('[ng-click="dialog.hide()"]'));
  this.replicateForm = element(by.css('[aria-label="Replicate Objects"]'));
}

module.exports = elements;
