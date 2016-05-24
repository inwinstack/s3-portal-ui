import app from '../../../index.js';
import upCtrl from './upload.controller';
import fileService from '../file.service';
import uploadService from './upload.servce';
import transService from '../../layout/transfer/transfer.service';

describe('Upload Unit Test', function() {
    let $rootScope;
    let makeFileService;
    let BucService;
    let makeUpService;
    let makeTransService;
    let makeDeferred;
    let makeController;
    let $fetch;
    let $toast;
    let $mdDialog;
    let $breadcrumb;
    let Upload;
    let Config = { API_URL: '0.0.0.0:0000' };
    let $stateParams = {
        path: 'BucketName/FolderA/FolderB'
    };

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(($q, _Upload_, _$rootScope_, _$mdDialog_, _$toast_, _$breadcrumb_, _$fetch_) => {
        $rootScope = _$rootScope_;

        $fetch = _$fetch_;

        $toast = _$toast_;

        $mdDialog = _$mdDialog_;

        Upload = _Upload_;

        BucService = {};

        makeFileService = () => {
            return new fileService($mdDialog, $fetch, BucService);
        };

        makeUpService = (fileService, transService) => {
            return new uploadService(Config, Upload, $mdDialog, fileService, transService);
        };

        makeDeferred = () => {
        	return $q.defer();
        };

        makeController = (fileService, upService) => {
            return new upCtrl(fileService, upService, $rootScope);
        };

        makeTransService = (fileService) => {
            return new transService($toast, fileService);
        };
    }));
    describe('when upload in controller', function() {
        let service;
        let controller;
        let mockUpload;
        beforeEach(function() {
            service = makeUpService(makeFileService());
            controller = makeController(makeFileService(), service);
            service.upload = () => {};
            mockUpload = sinon.spy(service, 'upload');
        });

        it('should invoke upload in service', function() {
            expect(mockUpload.called).to.eq(false);
            controller.upload();
            expect(mockUpload.called).to.eq(true);
        });
    });
    describe('when select in controller', function() {
        let service;
        let controller;
        let mockSelect;
        beforeEach(function() {
            service = makeUpService(makeFileService());
            controller = makeController(makeFileService(), service);
            service.select = () => {};
            mockSelect = sinon.spy(service, 'select');
        });

        it('should invoke upload in service', function() {
            expect(mockSelect.called).to.eq(false);
            controller.select(123);
            expect(mockSelect).to.have.been.calledWith(123);
        });
    });
    describe('when delete in controller', function() {
        let service;
        let controller;
        let mockDelete;
        beforeEach(function() {
            service = makeUpService(makeFileService());
            controller = makeController(makeFileService(), service);
            service.delete = () => {};
            mockDelete = sinon.spy(service, 'delete');
        });

        it('should invoke upload in service', function() {
            expect(mockDelete.called).to.eq(false);
            controller.delete(321);
            expect(mockDelete).to.have.been.calledWith(321);
        });
    });
    describe('when cancel in controller', function() {
        let service;
        let controller;
        let mockCloseDialog;
        beforeEach(function() {
            service = makeUpService(makeFileService());
            controller = makeController(makeFileService(), service);
            service.closeDialog = () => {};
            mockCloseDialog = sinon.spy(service, 'closeDialog');
        });

        it('should invoke upload in service', function() {
            expect(mockCloseDialog.called).to.eq(false);
            controller.cancel();
            expect(mockCloseDialog.called).to.eq(true);
        });
    });
    describe('when init service', function() {
        let service;
        beforeEach(function() {
            service = makeUpService(makeFileService());
        });
        it('should declare service.state.files', function() {
            expect(service.state.files).to.be.empty;
        });
        it('should declare service.state.size', function() {
            expect(service.state.size).to.eq(0);
        });
    });
    describe('when select non-repeat files in service', function() {
        let service;
        let mockTotal;
        let file = [
            {
                'name': 'fileName',
                'size': 555
            },
            {
                'name': 'fileName2',
                'size': 5858
            }
        ]
        beforeEach(function() {
            service = makeUpService(makeFileService());
            service.select(file);
            $rootScope.$digest();
        });
        it('should declare service.state.files', function() {
            expect(service.state.files[0].id).to.be.a('symbol');
            expect(service.state.files[0].detail).to.have.property('name', 'fileName');
            expect(service.state.files[0].detail).to.have.property('size', 555);
            expect(service.state.files[1].id).to.be.a('symbol');
            expect(service.state.files[1].detail).to.have.property('name', 'fileName2');
            expect(service.state.files[1].detail).to.have.property('size', 5858);
        });
        it('should total size', function() {
            expect(service.state.size).to.eq(file.reduce((p, c) => p+c.size,0));
        });
    });
    describe('when select same name files', function() {
        let service;
        let mockTotal;
        let file = [
            {
                'name': 'fileName',
                'size': 555
            },
            {
                'name': 'fileName2',
                'size': 5858
            }
        ]
        beforeEach(function() {
            service = makeUpService(makeFileService());
            service.state.files = [ {
                id: Symbol('unique id'),
                detail: {
                    name: 'fileName2',
                    size: 808
                }
            }];
            service.select(file);
            $rootScope.$digest();
        });
        it('should not insert repeat files', function() {
            expect(service.state.files[0].id).to.be.a('symbol');
            expect(service.state.files[0].detail).to.have.property('name', 'fileName2');
            expect(service.state.files[0].detail).to.have.property('size', 808);
            expect(service.state.files[1].id).to.be.a('symbol');
            expect(service.state.files[1].detail).to.have.property('name', 'fileName');
            expect(service.state.files[1].detail).to.have.property('size', 555);
        });
        it('should total size', function() {
            expect(service.state.size).to.eq(service.state.files.reduce((p, c) => p+c.detail.size,0));
        });
    });
    describe('when delete in service', function() {
        let service;
        let mockTotal;
        let file = [
            {
                id: Symbol('unique id'),
                detail: {
                    name: 'fileName1',
                    size: 8585
                }
            },
            {
                id: Symbol('unique id'),
                detail: {
                    name: 'fileName2',
                    size: 808
                }
            }
        ];
        beforeEach(function() {
            service = makeUpService(makeFileService());
            service.state.files = file;
        });
        it('should delete files', function() {
            expect(service.state.files[0].id).to.be.a('symbol');
            expect(service.state.files[0].detail).to.have.property('name', 'fileName1');
            expect(service.state.files[0].detail).to.have.property('size', 8585);
            expect(service.state.files[1].id).to.be.a('symbol');
            expect(service.state.files[1].detail).to.have.property('name', 'fileName2');
            expect(service.state.files[1].detail).to.have.property('size', 808);
            service.delete(service.state.files[0].id);
            expect(service.state.files[0].id).to.be.a('symbol');
            expect(service.state.files[0].detail).to.have.property('name', 'fileName2');
            expect(service.state.files[0].detail).to.have.property('size', 808);
        });
        it('should total size', function() {
            service.delete(service.state.files[0].id);
            expect(service.state.size).to.eq(service.state.files.reduce((p, c) => p+c.detail.size,0));
        });
    });
    describe('when upload in service', function() {
        let service;
        let fileService;
        let transService;
        let mockPut;
        let mockCloseDialog;
        let mockUploadFile;
        beforeEach(function() {
            fileService = makeFileService();
            transService = makeTransService(fileService);
            fileService.paths = { bucket: 'BucketName', folders: ['FolderA', 'FolderB']};
            service = makeUpService(fileService, transService);
            service.state.files = [
                {
                    id: Symbol('unique id'),
                    detail: {
                        name: 'FileName',
                        size: 888
                    }
                }
            ];
            service.uploadFile = () => { return 'aPromise' };
            service.closeDialog = () => {};
            mockCloseDialog = sinon.spy(service, 'closeDialog');
            mockUploadFile = sinon.spy(service, 'uploadFile');
            mockPut = sinon.spy(transService, 'put');
            service.upload();
            $rootScope.$digest();
        });
        it('should let uploading to be true', function() {
            expect(service.state.uploading).to.eq(true);
        });
        it('should invoke $transfer.put and call by right way', function() {
            const { bucket, folders } = fileService.paths;
            const called = [{
                id: service.state.files[0].id,
                bucket: bucket,
                name: service.state.files[0].detail.name,
                type: 'UPLOAD',
                status: 'UPLOADING',
                upload: 'aPromise'
            }];
            expect(mockPut).to.have.been.calledWith(called);
        });
        it('should invoke uploadFile and call by id, data and url', function() {
            const { bucket, folders } = fileService.paths;
            const prefix = folders.length ? '' : `${folders.join('/')}/`;
            const called = {
                id: service.state.files[0].id,
                data: {
                    bucket: bucket,
                    prefix: prefix,
                    file: service.state.files[0].detail
                },
                url:`${Config.API_URL}/v1/file/create`
            }
            expect(mockUploadFile).to.have.been.calledWith(called.id, called.data, called.url);
        });
        it('should invoke closeDialog', function() {
            expect(mockCloseDialog.called).to.eq(true);
        });
    });
    describe('when createDialog in service', function() {
        let service;
        let fileService;
        let transService;
        let mockCreateDialog;
        beforeEach(function() {
            fileService = makeFileService();
            transService = makeTransService(fileService);
            service = makeUpService(fileService, transService);
            mockCreateDialog = sinon.spy($mdDialog, 'show');
            service.createDialog();
        });
        it('should invoke mdDialog.show', function() {
            expect(mockCreateDialog.called).to.eq(true);
        });
    });
    describe('when closeDialog in service', function() {
        let service;
        let fileService;
        let transService;
        let mockCancelDialog;
        let mockInitState;
        beforeEach(function() {
            fileService = makeFileService();
            transService = makeTransService(fileService);
            service = makeUpService(fileService, transService);
            mockInitState = sinon.spy(service, 'initState');
            mockCancelDialog = sinon.spy($mdDialog, 'cancel');
            service.closeDialog();
        });
        it('should invoke mdDialog.cancel', function() {
            expect(mockCancelDialog.called).to.eq(true);
        });
        it('should invoke initState in service', function() {
            expect(mockInitState.called).to.eq(true);
        });
    });
});