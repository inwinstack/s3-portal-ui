export default class PropertiesService {
  /** @ngInject */
  constructor($fetch) {
    Object.assign(this, {
    	$fetch,
    });
    this.state = {};
  }

  setProperties(file) {
  	this.state.file = file;
  }
  
  showProperties(bucket, file) {
  	this.state.file = file;
  	if (file.isFolder) {
  		this.getFolderSize(bucket, file);
  	}
  	this.setProperties(file);
  };
  
  getFolderSize(bucket, file) {
    const endpoint = `/v1/file/list/${bucket}?prefix=${file.Key}`;
    file.Size = parseInt(0);
    this.$fetch.get(endpoint)
      .then(({ data }) => {
	      for (var i = data.files.length - 1; i >= 0; i--) {
	      	if (data.files[i].Size != 0) {
	      		file.Size += parseInt(data.files[i].Size);
	      	}
	      }
	      this.setProperties(file);
    	})
  }
}
