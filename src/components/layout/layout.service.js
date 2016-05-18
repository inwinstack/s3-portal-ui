export default class LayoutService {
  constructor() {
    this.initState();
  }

  initState() {
    this.state = {
      transfer: false,
    };
  }

  toggleTransfer() {
    this.state.transfer = ! this.state.transfer;
  }
}
