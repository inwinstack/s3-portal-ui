function elements () {
  this.fileMoveList = element.all(by.repeater('f in move.data'));
  this.moveBtn = element(by.css('[ng-click="move.move()"]'));
  this.closeBtn = element.all(by.css('[ng-click="move.cancel()"]'));
  this.moveForm = element(by.name('move.form'));
}

module.exports = elements;
