import app from './../../index.js';
import fileCtrl from './file.controller';
import fileService from './file.service';
import bucketService from '../bucket/bucket.service';

describe('File Unit Test', function() {
    let $rootScope;
    let makeService;
    let BucService;
    let makeDeferred;
    let makeController;
    let $fetch;
    let $toast;
    let $bucket;
    let $mdDialog;
    let $breadcrumb;
    let $stateParams = {
        path: 'BucketName/FolderA/FolderB'
    };

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(($q, _$rootScope_, _$mdDialog_, _$toast_, _$breadcrumb_, _$fetch_) => {
        $rootScope = _$rootScope_;

        $toast = _$toast_;

        $fetch = _$fetch_;

        $mdDialog = _$mdDialog_;

        $breadcrumb = _$breadcrumb_;

        makeService = () => {
            return new fileService($fetch, BucService);
        };

        makeDeferred = () => {
        	return $q.defer();
        };

        BucService = new bucketService($fetch, $toast, $mdDialog, $breadcrumb);

        makeController = (service) => {
            return new fileCtrl($rootScope, $stateParams, service, BucService, $breadcrumb);
        };
    }));
    describe('when init service', function() {
        let service;

        beforeEach(function() {

            service = makeService();
        });

        it('should declare paths', function() {
            expect(service.state.paths.bucket).to.eq('');
            expect(service.state.paths.folders).to.be.empty;
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
            service.setPaths('BucketName', ["FolderA", "FolderB"]);
        });
        it('should put value to service.paths', function() {
        	expect(service.paths).to.have.property('bucket', 'BucketName');
        	expect(service.paths.folders).to.have.property([0], 'FolderA');
        	expect(service.paths.folders).to.have.property([1], 'FolderB');
        });
    });

    describe('when getFiles in service and response success', function() {
        let service;
        let testMock;
        let fetchMock;
        let deferred;
        let res;
        beforeEach(function() {
            service = makeService();
            deferred = makeDeferred();
            fetchMock = sinon.mock(service.$fetch);
            fetchMock.expects('get').returns(deferred.promise);
            // testMock = sinon.spy(service.$fetch, 'get');
            res = {
			  "files": [
			    {
			      "name": "fileName",
			      "Size": "323844"
			    }
			  ]
			}
            service.paths = { bucket: 'BucketName', folders: ['FolderA', 'FolderB']};
            deferred.resolve({ data:res });
            service.getFiles();
        	$rootScope.$digest();
        });
        it('should requesting to be false', function() {
        	expect(service.state.lists.requesting).to.eq(false);
        });
        it('should let data have files information', function() {
        	expect(service.state.lists.data).to.have.deep.property('[0].name', "fileName");
            expect(service.state.lists.data).to.have.deep.property('[0].Size', "323844")
        });
        it('should let error to be false', function() {
            expect(service.state.lists.error).to.eq(false);
        })
    });

    describe('when getFiles in service and response fail', function() {
        let service;
        let testMock;
        let fetchMock;
        let deferred;
        beforeEach(function() {
            service = makeService();
            deferred = makeDeferred();
            fetchMock = sinon.mock(service.$fetch);
            fetchMock.expects('get').returns(deferred.promise);
            service.paths = { bucket: 'BucketName', folders: ['FolderA', 'FolderB']};
            deferred.reject();
            service.getFiles();
            $rootScope.$digest();
        });
        it('should requesting to be false', function() {
            expect(service.state.lists.requesting).to.eq(false);
        });
        it('should let error to be true', function() {
            expect(service.state.lists.error).to.eq(true);
        })
    });

    describe('when init controller', function() {
        let service;
        let controller;
        let mockSetPaths;
        let mockGetFiles;
        let mockUpdateFP;
        let mockGetBucket;
        beforeEach(function() {
            service = makeService();
            service.getFiles = () => {};
            mockSetPaths = sinon.spy(service, 'setPaths');
            mockUpdateFP = sinon.spy($breadcrumb, 'updateFilePath');
            mockGetBucket = sinon.spy(BucService, 'getBuckets')
            mockGetFiles = sinon.spy(service, 'getFiles');
            controller = makeController(service);
        });
        it('should invoke setPaths in fileService and call by PATH', function() {
            expect(mockSetPaths).to.have.been.calledWith('BucketName', ["FolderA", "FolderB"]);
        });
        it('should invoke $breadcrumb.updateFilePath by folders', function() {
            expect(mockUpdateFP).to.have.been.calledWith(["FolderA", "FolderB"]);
        });
        it('should invoke getbuckets in bucketService', function() {
        	expect(mockGetBucket.called).to.eq(true);
        });
        it('should invoke getFiles in fileService', function() {
        	expect(mockGetFiles.called).to.eq(true)
        });
    });

});