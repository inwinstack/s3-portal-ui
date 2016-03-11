import { module } from 'angular';
import router from 'angular-ui-router';
import <%= upCaseName %>Controller from './<%= name %>.controller';<% if (route) { %>
import <%= upCaseName %>Template from './<%= name %>.html';
<% } %>
import './<%= name %>.css';
<% if (route) { %>
/** @ngInject */
const route = $stateProvider => {
  $stateProvider.state('<%= name %>', {
    url: '/<%= name %>',
    parent: 'root',
    template: <%= upCaseName %>Template,
    controller: '<%= upCaseName %>Controller',
    controllerAs: '<%= name %>',
  });
};
<% } %>
const <%= upCaseName %> = module('<%= name %>', [
  router,
])
.controller('<%= upCaseName %>Controller', <%= upCaseName %>Controller)<% if (route) { %>
.config(route);
<% } %>
export default <%= upCaseName %>.name;
