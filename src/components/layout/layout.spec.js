/* eslint-env mocha */
/* eslint no-unused-vars:0 */
/* global inject, chai, sinon */

import LayoutModule from './layout';
import LayoutController from './layout.controller';
import LayoutTemplate from './layout.html';

describe('Layout', () => {
  let $rootScope;
  let makeDeferred;
  let makeController;

  beforeEach(window.module(LayoutModule.name));

  beforeEach(inject(($q, _$rootScope_) => {
    $rootScope = _$rootScope_;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new LayoutController();
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
      expect(LayoutTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });
});
