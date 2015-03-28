import Ember from 'ember';

var ServerVariablesService = Ember.Service.extend({
  unknownProperty: function(serverVar) {
    var ENV = this.get('env');
    var prefix = ENV.serverVariables.tagPrefix || ENV.modulePrefix;

    var content = Ember.$(`head meta[name=${prefix}-${serverVar}]`).attr('content');
    if (content !== "") {
      return content;
    } else {
      return undefined;
    }
  }
});

export default ServerVariablesService;
