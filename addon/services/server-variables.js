import { isBlank } from '@ember/utils';
import { dasherize } from '@ember/string';
import Service from '@ember/service';

export default Service.extend({
  unknownProperty: function (serverVar) {
    var ENV = this.get('env');
    var prefix = ENV.serverVariables.tagPrefix || ENV.modulePrefix;
    var dasherizedVar = dasherize(serverVar);

    // ensure we don't die in fastboot by checking if document exists
    var tag = document
      ? document.querySelector(`head meta[name=${prefix}-${dasherizedVar}]`)
      : null;
    var content = tag ? tag.content : null;

    if (!isBlank(content)) {
      try {
        return JSON.parse(content);
      } catch (e) {
        // content was not JSON
        return content;
      }
    }
  },
});
