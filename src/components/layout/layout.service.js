export default class LayoutService {
  constructor() {
    this.initState();
  }

  initState() {
    this.state = {
      transfers: false,
      properties: false,
    };
  }

  openProperties() {
    this.state = {
      transfers: false,
      properties: true,
    };
  }

  openTransfers() {
    this.state = {
      transfers: true,
      properties: false,
    };
  }

  closeSidePanels() {
    this.state = {
      transfers: false,
      properties: false,
    };
  }
}
