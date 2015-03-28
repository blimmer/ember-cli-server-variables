import Ember from 'ember';
import ServerVariablesService from 'ember-cli-server-variables/services/server-variables';
import ENV from '../config/environment';

export default ServerVariablesService.extend({
  env: Ember.computed(function() {
    return ENV;
  })
});
