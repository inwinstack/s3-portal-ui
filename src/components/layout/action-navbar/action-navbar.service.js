export default class ActionNavbarService {
  constructor() {
    this.type = 'Bucket';
  }

  setTypeToBucket() {
    this.type = 'Bucket';
  }

  setTypeToFile() {
    this.type = 'File';
  }
}
