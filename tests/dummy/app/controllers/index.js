import Ember from 'ember';

export default Ember.Controller.extend({
  serverVariablesService: Ember.inject.service('serverVariables'),

  token: Ember.computed.reads('serverVariablesService.token')
});
