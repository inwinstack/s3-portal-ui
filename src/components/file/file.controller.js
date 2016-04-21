export default class FileController {
  /** @ngInject */
  constructor($stateParams) {
    this.path = $stateParams.path;
    console.log(this.path.split('/')); // ['bucketName', 'folderA', 'folderB'];
  }
}
