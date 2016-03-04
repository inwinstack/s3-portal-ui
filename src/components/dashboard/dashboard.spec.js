/* eslint-env mocha */
/* eslint no-unused-vars:0 */
/* global inject, chai, sinon */

import DashboardModule from './dashboard';
import DashboardController from './dashboard.controller';
import DashboardTemplate from './dashboard.html';

describe('Dashboard', () => {
  let $rootScope;
  let makeDeferred;
  let makeController;

  beforeEach(window.module(DashboardModule.name));

  beforeEach(inject(($q, _$rootScope_) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new DashboardController();
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
      expect(DashboardTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });
});
