/* eslint-env mocha */
/* eslint no-unused-vars:0 */
/* global inject, expect */

import NotFoundModule from './notFound';
import NotFoundController from './notFound.controller';
import NotFoundTemplate from './notFound.html';

describe('NotFound', () => {
  let $rootScope;
  let makeController;

  beforeEach(window.module(NotFoundModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new NotFoundController();
    };
  }));

  describe('Module', () => {

  });

  describe('Controller', () => {
    it('has a name property [REMOVE]', () => {
      const controller = makeController();
      expect(controller).to.have.property('message');
    });
  });

  describe('Template', () => {

  });
});
