import deleteCtrl from './delete.controller';
import app from '../../../index.js';

describe('bucket testing', function() {
  let $rootScope;
  let makeController;
  let $bucket;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_$bucket_ , _$rootScope_,) => {
    $rootScope = _$rootScope_;

    $bucket = _$bucket_;

    makeController = () => {
        return new deleteCtrl($rootScope, $bucket);
    };
  }));
  describe('when check()', () => {
    let controller;
    let bool;
    it('should declare checkStatus', () => {
    	controller = makeController();
    	controller.inputName = 'Abc';
    	controller.deleteName = 'abc';
    	$rootScope.$digest();
    	controller.check();
    	expect(controller.checkStatus).to.eq(true);
    });
  });
  describe('when deleteBucket()', () => {
  	let controller;
  	let mockDelete;
  	beforeEach(() => {
  		controller = makeController();
  		mockDelete = sinon.spy($bucket, 'deleteBucket');
  		controller.deleteBucket();
  	});
  	it('should invoke deleteBucket in bucket service', () => {
  		expect(mockDelete.called).to.eq(true);
  	});
  });
  describe('when cancel()', () => {
  	let controller;
  	let mockClose;
  	beforeEach(() => {
  		controller = makeController();
  		mockClose = sinon.spy($bucket, 'closeDialog');
  		controller.cancel();
  	});
  	it('should invoke deleteBucket in bucket service', () => {
  		expect(mockClose.called).to.eq(true);
  	});
  });
});