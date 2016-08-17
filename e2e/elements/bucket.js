function elements () {
  this.bucketForm = element(by.name('create.form'));
  this.bucketList = element.all(by.repeater('b in bucket.data'));
  this.bucketCheckbox = element.all(by.css('[ng-checked="b.checked"]'));
  this.bucketFormCancelBtn = element.all(by.css('[ng-click="create.cancel()"]'));
  this.checkCreateBucketBtn = element(by.css('[ng-click="create.create()"]'));
  this.createBucketInput = element(by.css('[ng-readonly="create.form.$submitted"]'));
  this.createBucketBtn = element(by.css('[ng-click="actionNav.create($event)"]'));
  this.createBucket = element(by.css('[ng-click="bucket.createBucket($event)"]'));
  this.checkDeleteBucket = element(by.css('[ng-click="delete.deleteBucket()"]'));
  this.cancelDeleteBucketBtn = element.all(by.css('[ng-click="delete.cancel()"]'));
  this.deleteBucketBtn = element(by.css('[ng-click="actionNav.delete()"]'));
  this.deleteBucketForm = element(by.name('delete.form'));
  this.deleteBucketInput = element(by.model('delete.inputName'));
  this.deleteBucketMessage = element(by.css('[ng-show="delete.checkStatus"]'));
  this.navCreateBucketBtn = element(by.css('[ng-click="actionNav.create()"]'));
  this.noBucketTitle = element(by.css('[class="md-headline ng-scope"]'));
  this.noBucketSubtitle = element(by.css('[class="md-subhead ng-scope"]'));
  this.bucketCreateDescription = element(by.css('[class="md-title ng-scope"]'));
  this.bucketContent = element(by.css('md-dialog-content'));
  this.refreshBtn = element.all(by.css('[ng-click="actionNav.refresh()"]'));
  this.propertiesBtn = element.all(by.css('[ng-click="actionNav.openProperties()"]'));
  this.myAccountBtn = element(by.css('[aria-label="My Account"]'));
  this.billingAndCostManagementBtn = element(by.css('[aria-label="Billing and Cost Management"]'));
  this.securityCredentialsBtn = element(by.css('[aria-label="Security Credentials"]'));
  this.bucketDuplicateMessage = element(by.css('[ng-show="create.duplicated"]'));
  this.bucketDeleteConfirm = element(by.css('[translate="BUCKET.DELETE_CONFIRM"]'));
  this.bucketDeleteTypeName = element.all(by.css('p[class="ng-scope"]')).get(1);
  this.bucketDelete = element(by.css('h2[class="ng-scope"]'));
  this.bucketName = element(by.css('label[class="ng-scope"]'));
  this.deleteBucketCheckStatus = element(by.css('[ng-show="delete.checkStatus"]'));
  this.deleteBucketError = element(by.css('[ng-messages="delete.form.name.$error"]'));
  // this.utilsName = element(by.css('[ng-if="bucket.data.length && ! bucket.requesting && ! bucket.error"]'));
}

module.exports = elements;
