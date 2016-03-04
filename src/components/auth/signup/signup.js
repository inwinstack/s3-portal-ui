import { module } from 'angular';
import router from 'angular-ui-router';
import SignUpController from './signup.controller';
import SignupTemplate from './signup.html';

/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('auth.signup', {
    url: '/signup',
    parent: 'auth',
    template: SignupTemplate,
    controller: 'SignUpController',
    controllerAs: 'signup',
  });
};

const SignUp = module('signup', [
  router,
])
.controller('SignUpController', SignUpController)
.config(route);

export default SignUp.name;
