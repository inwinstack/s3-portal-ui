import app from '../../../index.js';
import folderCtrl from './folder.controller.js';
import folderServ from './folder.service.js';
import folderHtml from './folder.html';


describe('Create Folder Unit Test', () => {
	let $rootScope;
	let makeService;
	let makeDeferred;
	let makeController;
	let makeTemplate;
	let $mdDialog;
	let $fetch;
	let $file;
	let $toast;
	let $compile;
	beforeEach(angular.mock.module('app'));

	beforeEach(inject(($q, _$rootScope_, _$mdDialog_, _$compile_, _$fetch_, _$file_, _$toast_) => {
		$rootScope = _$rootScope_;
		$mdDialog = _$mdDialog_;
		$fetch = _$fetch_;
		$file = _$file_;
		$toast = _$toast_;
		$compile = _$compile_;

		makeTemplate = angular.element(folderHtml);

		$compile(makeTemplate)($rootScope);

		makeDeferred = () => {
			return $q.defer();
		};

		makeController = (folderServ) => {
			return new folderCtrl(folderServ);
		};

		makeService = () => {
			return new folderServ($mdDialog, $fetch, $file, $toast);
		};
	}));
	describe('when init controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeController(makeService());
		});
		it('should declare controller.$folder', () => {
			expect(controller.$folder).not.to.be.null;
		});
	});
	describe('when trigger create() in controller', () => {
		let mockCreate;
		let controller;
		let service;
		let form;
		beforeEach(() => {
			service = makeService();
			service.createFolder = () => {};
			controller = makeController(service);
			mockCreate = sinon.spy(service, 'createFolder');
			form = $rootScope.create.form;
			form.folder.$setViewValue('FolderName');
			controller.create();
		});
		it('should invoke createFolder and call by folder name', () => {
			expect(mockCreate.called).to.eq(true);
			expect(mockCreate).to.have.been.calledWith(form.folder.$ViewValue);
		});
	});
	describe('when trigger cancel() in controller', () => {
		let mockClose;
		let controller;
		let service;
		beforeEach(() => {
			service = makeService();
			service.closeDialog = () => {};
			controller = makeController(service);
			mockClose = sinon.spy(service, 'closeDialog');
			controller.cancel();
		});
		it('should invoke closeDialog in service', () => {
			expect(mockClose.called).to.eq(true);
		});
	});
	describe('when trigger initState() in service', () => {
		let service;
		beforeEach(() => {
			service = makeService();
			service.initState();
		});
		it('should declare state.duplicated', () => {
			expect(service.state.duplicated).to.eq(false);
		});
	});
	describe('when trigger createFolder in service and success', () => {
		let deferred;
		let service;
		let mockGetFiles;
		let mockToast;
		let mockClose;
		let mockFetch;
		let message;
		beforeEach(() => {
			$file.getFiles = () => {};
			$toast.show = () => {};
			mockFetch = sinon.mock($fetch);
			service = makeService();
			service.closeDialog = () => {};
			deferred = makeDeferred();
			mockFetch.expects('post').returns(deferred.promise);
			deferred.resolve();
			mockGetFiles = sinon.spy($file, 'getFiles');
			mockToast = sinon.spy($toast, 'show');
			mockClose = sinon.spy(service, 'closeDialog');
			message = "Bucket FolderName has created!";
			service.createFolder('FolderName');
			$rootScope.$digest();
		});
		it('should invoke getFiles in fileService', () => {
			expect(mockGetFiles.called).to.eq(true);
		});
		it('should invoke $toast.show and call by message', () => {
			expect(mockToast).to.have.been.calledWith(message);
		});
		it('should invoke closeDialog()', () => {
			expect(mockClose.called).to.eq(true);
		});
	});
	describe('when trigger createFolder in service and fail', () => {
		let deferred;
		let service;
		let mockFetch;
		beforeEach(() => {
			mockFetch = sinon.mock($fetch);
			service = makeService();
			service.state = {};
			deferred = makeDeferred();
			mockFetch.expects('post').returns(deferred.promise);
			deferred.reject();
			service.createFolder('FolderName');
			$rootScope.$digest();
		});
		it('should invoke getFiles in fileService', () => {
			expect(service.state.duplicated).to.eq(true);
		});
	});
	describe('when trigger createDialog in service', () => {
		let service;
		let mockDialog;
		beforeEach(() => {
			mockDialog = sinon.spy($mdDialog, 'show');
			service = makeService();
			service.createDialog();
		});
		it('should invoke mdDialog.show', () => {
			expect(mockDialog.called).to.eq(true);
		});
	});
	describe('when trigger closeDialog in service', () => {
		let service;
		let mockDialog;
		let mockInit;
		beforeEach(() => {
			service = makeService();
			mockDialog = sinon.spy($mdDialog, 'cancel');
			mockInit = sinon.spy(service, 'initState');
			service.closeDialog();
		});
		it('should invoke mdDialog.cancel', () => {
			expect(mockDialog.called).to.eq(true);
		});
		it('should invoke initState', () => {
			expect(mockInit.called).to.eq(true);
		})
	});
});