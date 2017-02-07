import MoveController from './move.controller';
import moveTemplate from './move.html'

describe('MoveList unit test', function() {
  let $rootScope;
  let makeController;
  let makeDeferred;
  let makeTemplate;
  let $stateParams;
  let form;
  let $move;
  let $file;
  let $compile;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q, _$rootScope_, _$move_, _$file_, _$stateParams_,  _$compile_) => {
    $rootScope = _$rootScope_;
    $move = _$move_;
    $file = _$file_;
    $stateParams = _$stateParams_;
    $compile = _$compile_;

    makeTemplate = angular.element(moveTemplate);

    $compile(makeTemplate)($rootScope);

    form = $rootScope.move.form;

    makeDeferred = () => {
      return $q.defer();
    };

    makeController = () => {
      return new MoveController($file, $move, $rootScope, $stateParams);
    };
  }));

  beforeEach(function() {
    $stateParams.path = 'testS3';
    const moveLists = makeDeferred();
    const MoveMock = sinon.mock($move);
    MoveMock.expects('getFiles').returns(moveLists.promise);
    moveLists.resolve({
      $$hashKey: 'object:272',
      CreationDate: '2016-12-29T06:40:39.840Z',
      Name: 'testS3',
      checked: false,
    });
  });

  describe('when open dialog', function() {
    it('should close move dialog', function() {
      const controller = makeController();
      const moveMock = sinon.mock($move);
      controller.cancel();
      $rootScope.$digest();

      moveMock.expects('closeDialog').once();
    });

    it('click move button should trigger file transfer', function(done) {
      const controller = makeController();
      const moveLists = makeDeferred();
      const MoveMock = sinon.mock($move);
      MoveMock.expects('moveFile').returns(moveLists.promise);
      moveLists.resolve();

      controller.fileSelected = [
        {
          Key: 'tax/catsense.jpg',
          LastModified: '2017-01-19T10:33:29.242Z',
          Size: '8550',
          StorageClass: 'STANDARD',
          checked: true,
          display: 'catsense.jpg',
          icon: 'insert_drive_file',
          isFolder :false
        }
        // {
        //   Key: 'tax/ceph-status2.png',
        //   LastModified: '2017-01-19T10:33:29.242Z',
        //   Size: '30219',
        //   StorageClass: 'STANDARD',
        //   checked: true,
        //   display: 'ceph-status2.png',
        //   icon: 'insert_drive_file',
        //   isFolder :false
        // }
      ];
      controller.paths = 'testS3';

      controller.move();
      $rootScope.$digest();

      process.nextTick(() => {
        done();
        expect(controller.form.$submitted).to.eq(false);
      });
    });
  });  
});
