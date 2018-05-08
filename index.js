'use strict';
const contentForHelper = require('./lib/content-for-helper');

module.exports = {
  name: 'ember-cli-server-variables',

  contentFor: function(type, config) {
    if (type === 'server-variables') {
      return contentForHelper.generateServerVariableString(config);
    }
  }
};
