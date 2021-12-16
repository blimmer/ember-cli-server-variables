'use strict';
const contentForHelper = require('./lib/content-for-helper');

module.exports = {
  name: require('./package').name,

  contentFor: function (type, config) {
    if (type === 'server-variables') {
      return contentForHelper.generateServerVariableString(config);
    }
  },
};
