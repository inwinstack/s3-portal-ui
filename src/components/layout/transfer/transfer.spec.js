import app from '../../../index.js';
import transCtrl from './transfer.controller';
import transServ from './transfer.service';


describe('Upload Status unit test', () => {
	let $rootScope;
	let $toast;
	let makeTransServ;
	let makeTransCtrl;
	let $layout = {};
	let $file = {};
	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_, _$toast_) => {
		$rootScope = _$rootScope_;

		$toast = _$toast_;

		makeTransCtrl = (transServ) => {
			return new transCtrl($rootScope, $layout, transServ);
		};

		makeTransServ = () => {
			return new transServ($toast, $file);
		};

	}));
	describe('when trigger toggleAutoClear() in controller', () => {
		let mockToggle;
		let service;
		let controller;
		beforeEach(() => {
			service = makeTransServ();
			controller = makeTransCtrl(service);
			mockToggle = sinon.spy(service, 'toggleAutoClear');
		});
		it('should invoke toggleAutoClear that in service', () => {
			expect(mockToggle.called).to.eq(false);
			controller.toggleAutoClear();
			expect(mockToggle.called).to.eq(true);
		});
	});
	describe('when trigger close() in controller', () => {
		let mockClose;
		let service;
		let controller;
		beforeEach(() => {
			service = makeTransServ();
			$layout.closeSidePanels = () => {};
			controller = makeTransCtrl(service);
			mockClose = sinon.spy($layout, 'closeSidePanels');
		});
		it('should invoke closeSidePanels that in layout service', () => {
			expect(mockClose.called).to.eq(false);
			controller.close();
			expect(mockClose.called).to.eq(true);
		});
	});
	describe('when trigger md2line() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ status: 'DELETED' }, { status: 'COMPLETED' },
				{ status: 'COMP'}, { status: 'failed'	}
			];
			expect(controller.md2line(tester[0])).to.eq(true);
			expect(controller.md2line(tester[1])).to.eq(true);
			expect(controller.md2line(tester[2])).to.eq(false);
			expect(controller.md2line(tester[3])).to.eq(false);
		});
	});
	describe('when trigger md3line() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ status: 'uploading' }, { status: 'RESUMING' },
				{ status: 'UPLOADING'}, { status: 'RESUMIN'	}
			];
			expect(controller.md3line(tester[0])).to.eq(false);
			expect(controller.md3line(tester[1])).to.eq(true);
			expect(controller.md3line(tester[2])).to.eq(true);
			expect(controller.md3line(tester[3])).to.eq(false);
		});
	});
	describe('when trigger isUpload() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ type: 'UplOAd' }, { type: 'UPLOAD' },
				{ type: 'upload'}, { type: 'UPLOA'	}
			];
			expect(controller.isUpload(tester[0])).to.eq(false);
			expect(controller.isUpload(tester[1])).to.eq(true);
			expect(controller.isUpload(tester[2])).to.eq(false);
			expect(controller.isUpload(tester[3])).to.eq(false);
		});
	});
	describe('when trigger isDelete() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ type: 'DELEtE' }, { type: 'ELET' },
				{ type: 'DELETE'}, { type: 'delete'	}
			];
			expect(controller.isDelete(tester[0])).to.eq(false);
			expect(controller.isDelete(tester[1])).to.eq(false);
			expect(controller.isDelete(tester[2])).to.eq(true);
			expect(controller.isDelete(tester[3])).to.eq(false);
		});
	});
	describe('when trigger isUploading() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ status: 'UPLOADING' }, { status: 'UPLOADiNG' },
				{ status: 'uploading'}, { status: 'LOADING'	}
			];
			expect(controller.isUploading(tester[0])).to.eq(true);
			expect(controller.isUploading(tester[1])).to.eq(false);
			expect(controller.isUploading(tester[2])).to.eq(false);
			expect(controller.isUploading(tester[3])).to.eq(false);
		});
	});
	describe('when trigger isCompleted() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ status: 'COMPLETeD' }, { status: 'COMPLETED' },
				{ status: 'completed'}, { status: 'COMPLE'	}
			];
			expect(controller.isCompleted(tester[0])).to.eq(false);
			expect(controller.isCompleted(tester[1])).to.eq(true);
			expect(controller.isCompleted(tester[2])).to.eq(false);
			expect(controller.isCompleted(tester[3])).to.eq(false);
		});
	});
	describe('when trigger showInfo() in controller', () => {
		let controller;
		beforeEach(() => {
			controller = makeTransCtrl(makeTransServ());
		});
		it('should return true or false judge by status', () => {
			const tester = [
				{ status: 'FAILED' }, { status: 'failed' },
				{ status: 'PAUSED'}, { status: 'PAUSE'	}
			];
			expect(controller.showInfo(tester[0])).to.eq(false);
			expect(controller.showInfo(tester[1])).to.eq(true);
			expect(controller.showInfo(tester[2])).to.eq(false);
			expect(controller.showInfo(tester[3])).to.eq(true);
		});
	});
});