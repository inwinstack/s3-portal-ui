export default class TransferService {
  constructor() {
    this.initState();
  }

  initState() {
    this.state = {
      transfers: {},
    };
  }
}
