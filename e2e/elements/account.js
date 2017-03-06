function elements () {
  this.loadingIcon = element(by.css('[class="ng-isolate-scope md-mode-indeterminate"]'));
  this.pieChart = element(by.css('[class="nv-pieWrap nvd3-svg"]'));
  this.confirmBtn = element(by.css('[ng-click="storage.confirm()"]'));
}

module.exports = elements;
