import {
  en,
  tw,
  cn,
} from '../translations';

/** @ngInject */
export default $translateProvider => {
  $translateProvider
    .useSanitizeValueStrategy('escape')
    .translations('en', en)
    .translations('tw', tw)
    .translations('cn', cn)
    .preferredLanguage('en')
    .fallbackLanguage('en');
};
