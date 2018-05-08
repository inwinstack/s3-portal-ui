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
	describe('when init service', () => {
		let service;
		beforeEach(() => {
			service = makeTransServ();
		});
		it('should dclare autoClear', () => {
			expect(service.state.autoClear).to.eq(false);
		});
		it('should dclare processing', () => {
			expect(service.state.processing).to.eq(false);
		});
		it('should dclare transfers', () => {
			expect(service.state.transfers).to.be.empty;
		});
	});
	describe('when trigger isProcessing() in service', () => {
		let service;
		beforeEach(() => {
			service = makeTransServ();
		});
		it('should return true or false judge by state.processing', () => {
			expect(service.isProcessing()).to.eq(service.state.processing);
			expect(service.isProcessing()).to.eq(false);
			expect(service.state.processing).to.eq(false);
		});
	});
	describe('when trigger toggleAutoClear() in service', () => {
		let service;
		beforeEach(() => {
			service = makeTransServ();
		});
		it('should dclare autoClear', () => {
			expect(service.state.autoClear).to.eq(false);
		});
		it('should dclare processing', () => {
			expect(service.state.processing).to.eq(false);
		});
		it('should dclare transfers', () => {
			expect(service.state.transfers).to.be.empty;
		});
	});
	describe('when trigger put() in service', () => {
		let service;
		beforeEach(() => {
			service = makeTransServ();
			service.state.transfers = [{ c: 'cc' }];
			const tf = [{ a:'aa' }, { b:'bb' }];
			service.put(tf)
		});
		it('should let processing to be true', () => {
			expect(service.state.processing).to.eq(true);
		});
		it('should insert incoming variables to state.transfers', () => {
			expect(service.state.transfers[1]).to.have.property('a', 'aa');
			expect(service.state.transfers[2]).to.have.property('b', 'bb');
			expect(service.state.transfers[0]).to.have.property('c', 'cc');
		});
	});
	describe('when trigger abort() in service', () => {
		let service;
		let mockForA;
		let mockForB;
		let mockForC;
		beforeEach(() => {
			service = makeTransServ();
			const tf = [{ a:'aa', status: 'UPLOAD', upload:{abort(){}} },
				{ b:'bb', status: 'UPLOADING', upload:{abort(){}} },
				{ c: 'cc', status: 'UPLOADING', upload:{abort(){}} }];
			service.state.transfers = tf;
			mockForA = sinon.spy(service.state.transfers[0].upload, 'abort');
			mockForB = sinon.spy(service.state.transfers[1].upload, 'abort');
			mockForC = sinon.spy(service.state.transfers[2].upload, 'abort');
			service.abort();
		});
		it('should clear service.state.transfers', () => {
			expect(service.state.transfers).to.be.empty;
		});
		it('should invoke which status is uploading', () => {
			expect(mockForA.called).to.eq(false);
			expect(mockForB.called).to.eq(true);
			expect(mockForC.called).to.eq(true);
		});
	});
	describe('when trigger remove() in service', () => {
		let service;
		let tf = [
			{id:'1'}, {id:'b'}, {id: 'C'}
		];
		beforeEach(() => {
			service = makeTransServ();
			service.state.transfers = tf;
		});
		it('should remove incoming object', () => {
			expect(service.state.transfers[0]).to.have.property('id', '1');
			expect(service.state.transfers[1]).to.have.property('id', 'b');
			expect(service.state.transfers[2]).to.have.property('id', 'C');
			service.remove(1);
			expect(service.state.transfers[0]).to.have.property('id', '1');
			expect(service.state.transfers[1]).to.have.property('id', 'C');
		});
	});
	describe('when trigger findTransferIndex() in service', () => {
		let service;
		let tf = [
			{id:'1'}, {id:'b'}, {id: 'C'}
		];
		beforeEach(() => {
			service = makeTransServ();
			service.state.transfers = tf;
		});
		it('should remove incoming object', () => {
			expect(service.state.transfers[0]).to.have.property('id', '1');
			expect(service.state.transfers[1]).to.have.property('id', 'b');
			expect(service.state.transfers[2]).to.have.property('id', 'C');
			expect(service.findTransferIndex('b')).to.eq(1);
			expect(service.findTransferIndex('C')).to.eq(2);
			expect(service.findTransferIndex('1')).to.eq(0);
		});
	});
	describe('when handleEvent() in service', () => {
		let service;
		let mockFind;
		let evt;
		let counted;
		beforeEach(() => {
			service = makeTransServ();
			service.state.transfers = [{id:'a'}, { id:'B'}];
			evt = { loaded:1818, total:5684 };
			counted = (evt.loaded / evt.total * 100).toFixed(2);
			mockFind = sinon.spy(service, 'findTransferIndex');
			service.handleEvent('a', evt);
		});
		it('should invoke findTransferIndex', () => {
			expect(mockFind).to.have.been.calledWith('a');
		});
		it('should declare process value', () => {
			expect(service.state.transfers[0].process).to.have.property('loaded', 1818);
			expect(service.state.transfers[0].process).to.have.property('total', 5684);
			expect(service.state.transfers[0].process.precentage).to.eq(counted);
		});
	});

	describe('when handleSuccess() in service', () => {
		let service;
		let mockFind;
		let mockRemove;
		let mockToast;
		let mockUpdate;
		let mockGetFile;
		let successMessage;
		beforeEach(() => {
			service = makeTransServ();
			successMessage = ' is uploaded successfully!';
			$file.getFiles = () => {};
			service.updateProcessStatus = () => {};
			service.state.transfers = [
				{id:'a', name:'aName'}, { id:'B', name:'bName'}
			];
			mockFind = sinon.spy(service, 'findTransferIndex');
			mockRemove = sinon.spy(service, 'remove');
			mockToast = sinon.spy($toast, 'show');
			mockUpdate = sinon.spy(service, 'updateProcessStatus');
			mockGetFile = sinon.spy($file, 'getFiles');
			service.handleSuccess('a');
		});
		it('should invoke findTransferIndex and call by id', () => {
			expect(mockFind).to.have.been.calledWith('a');
		});
		it('should let status been COMPLETED', () => {
			expect(service.state.transfers[0].status).to.eq('COMPLETED');
		});
		it('should invoke $toast.show and call by name', () => {
			expect(mockToast).to.have.been.calledWith(service.state.transfers[0].name + successMessage);
		});
		it('should invoke remove judge by autoClear', () => {
			expect(mockRemove.called).to.eq(service.state.autoClear);
		});
		it('should invoke updateProcessStatus', () => {
			expect(mockUpdate.called).to.eq(true);
		});
		it('should invoke $file.getFiles()', () => {
			expect(mockGetFile.called).to.eq(true);
		});
	});
	describe('when handleFailure() in service', () => {
		let service;
		let mockFind;
		let mockToast;
		let mockUpdate;
		let errorMessage;
		beforeEach(() => {
			service = makeTransServ();
			const status = { statusText: 'FAIL' }
			errorMessage = " is uploaded failure! Error message: ";
			service.state.transfers = [
				{id:'a', name:'aName'}, { id:'B', name:'bName'}
			];
			errorMessage = service.state.transfers[1].name + errorMessage + status.statusText;
			mockFind = sinon.spy(service, 'findTransferIndex');
			mockToast = sinon.spy($toast, 'show');
			mockUpdate = sinon.spy(service, 'updateProcessStatus');
			service.handleFailure('B', status);
		});
		it('should invoke findTransferIndex', () => {
			expect(mockFind.called).to.eq(true);
		});
		it('should invoke $toast.show', () => {
			expect(mockToast).to.have.been.calledWith(errorMessage);
		});
		it('should invoke updateProcessStatus', () => {
			expect(mockUpdate.called).to.eq(true);
		});
		it('should declare status and message', () => {
			expect(service.state.transfers[1].status).to.eq('FAILED');
			expect(service.state.transfers[1].message).to.eq('FAIL');
		});
	});
	describe('when updateProcessStatus() service', () => {
		let service;
		let tf;
		let tt;
		beforeEach(() => {
			service = makeTransServ();
			tf = [
				{id:'a', status:'UPLOADING'}, { id:'B', status:'RESUMING'},
				{id:'c', status:'RESUMING'}, { id:'D', status:'UPLOADING'}
			];
			tt = [
				{id:'a', status:'DONE'}, { id:'B', status:'DONE'},
				{id:'c', status:'DONE'}, { id:'D', status:'COMPLETED'}
			]
		});
		it('should get true', () => {
			service.state.transfers = tt;
			service.updateProcessStatus();
			expect(service.state.process).to.eq(true);
		});
		it('should get false', () => {
			service.state.transfers = tf;
			service.updateProcessStatus();
			expect(service.state.process).to.eq(false);
		});
	});
});