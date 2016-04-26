import {
  EN,
  TW,
  CN,
} from '../translations';

/** @ngInject */
export default $translateProvider => {
  $translateProvider
    .useSanitizeValueStrategy('escape')
    .translations('EN', EN)
    .translations('TW', TW)
    .translations('CN', CN)
    .preferredLanguage('EN')
    .fallbackLanguage('EN');
};
