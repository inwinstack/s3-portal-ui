export default class FetchService {
  /** @ngInject */
  constructor($http, Config) {
    this.$http = $http;
    this.API_URL = Config.API_URL;
  }

  /**
   * Return a http call by given method, entry and payload.
   *
   * @param  {String} method
   * @param  {String} entry
   * @param  {Object} payload = null
   *
   * @return {Promise}
   */
  request(method, entry, payload = null) {
    return this.$http[method](`${this.API_URL}${entry}`, payload);
  }

  /**
   * Send a GET request.
   *
   * @param  {String} entry
   *
   * @return {Promise}
   */
  get(entry) {
    return this.request('get', entry);
  }

  /**
   * Send a POST request.
   *
   * @param  {String} entry
   * @param  {Object}} payload
   *
   * @return {Promise}
   */
  post(entry, payload) {
    return this.request('post', entry, payload);
  }

  /**
   * Send a PUT request.
   *
   * @param  {String} entry
   * @param  {Object} payload
   *
   * @return {Promise}
   */
  put(entry, payload) {
    return this.request('put', entry, payload);
  }

  /**
   * Send a DELETE request.
   *
   * @param  {String} entry
   * @param  {Object} payload
   *
   * @return {Promise}
   */
  delete(entry, payload) {
    return this.request('delete', entry, payload);
  }
}
