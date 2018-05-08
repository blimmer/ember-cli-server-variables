import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  serverVariablesService: service('serverVariables'),

  token: reads('serverVariablesService.token')
});
