import Ember from 'ember';

const {
  isBlank,
  String: { dasherize },
  Service,
} = Ember;

export default Service.extend({
  unknownProperty: function(serverVar) {
    var ENV = this.get('env');
    var prefix = ENV.serverVariables.tagPrefix || ENV.modulePrefix;
    var dasherizedVar = dasherize(serverVar);

    var content = Ember.$(`head meta[name=${prefix}-${dasherizedVar}]`).attr('content');
    if (!isBlank(content)) {
      try {
        return JSON.parse(content);
      } catch(e) {
        // content was not JSON
        return content;
      }
    }
  }
});
