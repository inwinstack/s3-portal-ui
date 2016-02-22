import {
  en,
  tw,
} from '../translations';

/** @ngInject */
export default $translateProvider => {
  $translateProvider
    .useSanitizeValueStrategy('escape')
    .translations('en', en)
    .translations('tw', tw)
    .preferredLanguage('en')
    .fallbackLanguage('en');
};
