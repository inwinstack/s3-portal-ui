/* eslint-env mocha */
/* eslint no-unused-vars:0 */
/* global inject, chai, sinon */

import AuthModule from './auth';
import AuthController from './auth.controller';
import AuthTemplate from './auth.html';

describe('Auth', () => {
  let $rootScope;
  let makeDeferred;
  let makeController;

  beforeEach(window.module(AuthModule.name));

  beforeEach(inject(($q, _$rootScope_) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new AuthController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AuthTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });
});
