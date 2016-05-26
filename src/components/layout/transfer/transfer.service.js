export default class TransferService {
  /** @ngInject */
  constructor($toast, $file) {
    Object.assign(this, {
      $toast, $file,
    });
    this.initState();
  }

  initState() {
    this.state = {
      autoClear: false,
      processing: false,
      transfers: [],
    };
  }

  isProcessing() {
    return this.state.processing;
  }

  toggleAutoClear() {
    this.state.autoClear = ! this.state.autoClear;
  }

  put(transfers) {
    this.state.processing = true;
    this.state.transfers = [
      ...this.state.transfers,
      ...transfers,
    ];
  }

  putDelete(transfers) {
    this.state.transfers = [
      ...this.state.transfers,
      ...transfers,
    ];
  }

  abort() {
    this.state.transfers.forEach(transfer => {
      if (transfer.status === 'UPLOADING') {
        transfer.upload.abort();
      }
    });
    this.state.transfers = [];
  }

  remove(id) {
    this.state.transfers = this.state.transfers.filter(
      (transfer, index) => index !== id
    );
  }

  findTransferIndex(id) {
    return this.state.transfers.findIndex(transfer => transfer.id === id);
  }

  handleEvent(id, { loaded, total }) {
    const i = this.findTransferIndex(id);
    const precentage = (loaded / total * 100).toFixed(2);
    this.state.transfers[i].process = {
      loaded, total, precentage,
    };
  }

  handleSuccess(id) {
    const i = this.findTransferIndex(id);
    this.state.transfers[i].status = 'COMPLETED';
    this.$toast.show(`${this.state.transfers[i].name} is uploaded successfully!`);

    if (this.state.autoClear) {
      this.remove(i);
    }

    this.updateProcessStatus();
    this.$file.getFiles();
  }

  handleFailure(id, { statusText }) {
    const i = this.findTransferIndex(id);
    this.state.transfers[i] = {
      ...this.state.transfers[i],
      status: 'FAILED',
      message: statusText,
    };
    this.$toast.show(
      `${this.state.transfers[i].name} is uploaded failure! Error message: ${statusText}`
    );
    this.updateProcessStatus();
  }

  handleDeleteSuccess(id) {
    const i = this.findTransferIndex(id);
    this.state.transfers[i].status = 'DELETED';
    this.$toast.show(`${this.state.transfers[i].name} is deleted successfully!`);

    if (this.state.autoClear) this.remove(i);

    this.$file.getFiles();
  }

  handleDeleteFailure(id, { statusText }) {
    const i = this.findTransferIndex(id);
    this.state.transfers[i] = {
      ...this.state.transfers[i],
      status: 'FAILED',
      message: statusText,
    };
    this.$toast.show(
      `${this.state.transfers[i].name} is deleted failure! Error message: ${statusText}`
    );
  }

  updateProcessStatus() {
    this.state.process = this.state.transfers.every(
      transfer => transfer.status !== 'UPLOADING' && transfer.status !== 'RESUMING'
    );
  }
}
