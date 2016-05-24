import app from '../../../index.js';
import upCtrl from './upload.controller';
import fileService from '../file.service';
import uploadService from './upload.servce';
import totalSize from '../../../utils/totalSize'

describe('Upload Unit Test', function() {
    let $rootScope;
    let makeFileService;
    let BucService;
    let makeUpService;
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

        makeUpService = (service) => {
            return new uploadService(Config, Upload, $mdDialog, service, $toast);
        };

        makeDeferred = () => {
        	return $q.defer();
        };

        makeController = (fileService, upService) => {
            return new upCtrl(fileService, upService, $rootScope);
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
            // console.log(service.state.size);
            // console.log(service.state.files.reduce((p, c) => p+c.detail.size,0))
        });
    });
});