const tw = require('./tw.js');
const cn = require('./cn.js');
const en = require('./en.js');

const twTranslate = new tw();
const cnTranslate = new cn();
const enTranslate = new en();

function Translate(language, term){
  switch(language){
  	case 'tw':
      return twTranslate.get(term);
  	break;
  	case 'cn':
      return cnTranslate.get(term);
  	break;
  	case 'en':
      return enTranslate.get(term);
  	break;
  }
}

module.exports = Translate;
