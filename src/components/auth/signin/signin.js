import { module } from 'angular';
import router from 'angular-ui-router';
import messages from 'angular-messages';
import SignInController from './signin.controller';
import SigninTemplate from './signin.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('auth.signin', {
    url: '/signin',
    parent: 'auth',
    template: SigninTemplate,
    controller: SignInController,
    controllerAs: 'signin',
  });
};

const SignIn = module('auth.signin', [
  router,
  messages,
])
.config(route);

export default SignIn.name;
