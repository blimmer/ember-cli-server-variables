import { computed } from '@ember/object';
import ServerVariablesService from 'ember-cli-server-variables/services/server-variables';
import ENV from '../config/environment';

export default ServerVariablesService.extend({
  env: computed(function () {
    return ENV;
  }),
});
