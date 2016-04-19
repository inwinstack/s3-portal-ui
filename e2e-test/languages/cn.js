function Translate(){
  this.languages = null;
}

Translate.prototype.get = function(term){
  this.languages = languages[term];
  return this.languages
}

const languages = {}

module.exports = Translate;