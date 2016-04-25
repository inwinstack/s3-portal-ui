export default class ActionNavbarService {
  constructor() {
    this.type = 'BUCKET';
  }

  setTypeToBucket() {
    this.type = 'BUCKET';
  }

  setTypeToFile() {
    this.type = 'FILE';
  }
}
