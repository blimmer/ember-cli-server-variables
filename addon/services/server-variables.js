import $ from 'jquery';
import { isBlank } from '@ember/utils';
import { dasherize } from '@ember/string';
import Service from '@ember/service';

export default Service.extend({
  unknownProperty: function(serverVar) {
    var ENV = this.get('env');
    var prefix = ENV.serverVariables.tagPrefix || ENV.modulePrefix;
    var dasherizedVar = dasherize(serverVar);

    var content = $(`head meta[name=${prefix}-${dasherizedVar}]`).attr('content');
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
