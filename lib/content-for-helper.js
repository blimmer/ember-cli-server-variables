'use strict';
var _forEach  = require('lodash/forEach');
var _defaults = require('lodash/defaults');

module.exports = {
  generateServerVariableString: function(config) {
    var env = config.serverVariables;

    if (typeof env === "undefined") {
      console.warn("You provided a {{content for 'server-variables'}} but didn't configure it for this environment.");
      return;
    }

    var vars = env.vars;

    if (!Array.isArray(vars)) {
      console.warn("You must pass ENV.serverVariables.vars as an array of variables");
      return;
    }

    var varsConfig = {};
    _forEach(vars, function(variable) {
      varsConfig[variable] = '';
    });

    if (typeof env.defaults !== 'undefined') {
      varsConfig = _defaults(env.defaults, varsConfig);
    }

    var modulePrefix = env.tagPrefix || config.modulePrefix;

    var metaString = '';
    for(var key in varsConfig) {
      metaString  = metaString + "\n<meta name='" + modulePrefix + "-" + key + "'content='" + varsConfig[key] + "'>";
    }

    return metaString;
  }
};
