import app from './../../index.js';
import fileCtrl from './file.controller';
import fileService from './file.service';

describe('File Unit Test', function() {
	let $rootScope;
	let makeService;
	let makeController;
	let $fetch;
	let $toast;
	let $bucket;
	let $mdDialog;
	let $stateParams = { path:'bucket/BucketName' };

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(($q, _$rootScope_, _$mdDialog_, _$toast_, ) => {
		$rootScope = _$rootScope_;

		$toast = _$toast_;

		$mdDialog = _$mdDialog_;

		makeService = () => {
			return new fileService($q, $toast, $mdDialog);
		};

		makeController = (service) => {
			return new fileCtrl($rootScope, $stateParams, service);
		}
	}));
	describe('when init service', function() {
		let service;
		
		beforeEach( function() {

			service = makeService();
		});

		it('should declare paths', function() {
			expect(service.state.paths.bucket).to.eq('');
			expect(service.state.paths.folders).to.eq('');
		});
		it('should declare lists', function() {
			expect(service.state.lists.data).to.be.empty;
			expect(service.state.lists.requesting).to.eq(false);
			expect(service.state.lists.error).to.eq(false);
		});
		it('should declare create', function() {
			expect(service.state.create.checking).to.eq(false);
			expect(service.state.create.checked).to.eq(false);
			expect(service.state.create.duplicated).to.eq(false);
		});
	});

	describe('when setPaths in service', function() {
		let service;

		beforeEach(function() {
			service = makeService();
		});
		//
	});

	describe('when getFiles in service', function() {
		let service;

		beforeEach(function() {
			service = makeService();
		});
		//
	});

	describe('when init controller', function() {
		let service;
		let controller;
		let mockSetPaths;
		let mockGetFiles;
		beforeEach(function() {
			service = makeService();
			service.setPaths = () => {};
			service.getFiles = () => {};
			mockSetPaths = sinon.spy(service, 'setPaths');
			mockGetFiles = sinon.spy(service, 'getFiles');
			controller = makeController(service);
			console.log(controller.folders);
		});
		it('should invoke setPaths in service and call by PATH', function() {
			// expect(mockSetPaths).to.have.been.calledWith('PATH');
		});
		it('should invoke getFiles', function() {
			// expect(mockGetFiles.called).to.eq(true);
		});
	});

});