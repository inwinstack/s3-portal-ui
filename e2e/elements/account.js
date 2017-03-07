function elements () {
  this.loadingIcon = element(by.css('[class="ng-isolate-scope md-mode-indeterminate"]'));
  this.pieChart = element(by.css('[class="nv-pieWrap nvd3-svg"]'));
  this.confirmBtn = element(by.css('[ng-click="storage.confirm()"]'));
  this.accountTitle = element(by.css('[class="md-actions layout-align-end-center layout-row"]'));
  this.accountTotal = element.all(by.css('h3[class="md-body-2 ng-scope ng-binding"]')).first();
  this.accountRemain = element.all(by.css('h3[class="md-body-2 ng-scope ng-binding"]')).get(1);
  this.accountTagRemain = element.all(by.css('g[class="nv-series"]')).first();
  this.accountTagUsed = element.all(by.css('g[class="nv-series"]')).get(1);
  this.accountDisplay = element(by.css('[class="md-secondary ng-pristine ng-untouched ng-valid ng-empty"]'));
  this.accountConfirm = element(by.css('[ng-click="storage.confirm()"]')).element(by.css('[class="ng-scope"]'));
}

module.exports = elements;
