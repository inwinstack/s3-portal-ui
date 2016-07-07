export default class PropertiesService {
  /** @ngInject */
  constructor() {
    this.state = {};
  }
  showProperties(file) {
  	this.state.file = file;
  };
}
