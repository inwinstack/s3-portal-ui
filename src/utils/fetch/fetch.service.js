export default class FetchService {
  /** @ngInject */
  constructor($http, Config) {
    this.$http = $http;
    this.API_URL = Config.API_URL;
  }

  get(entry) {
    return this.$http.get(`${this.API_URL}${entry}`);
  }

  post(entry, payload) {
    return this.$http.post(`${this.API_URL}${entry}`, payload);
  }

  put(entry, payload) {
    return this.$http.put(`${this.API_URL}${entry}`, payload);
  }

  delete(entry, payload) {
    return this.$http.delete(`${this.API_URL}${entry}`, payload);
  }
}
