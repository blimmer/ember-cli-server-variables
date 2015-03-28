'use strict';

module.exports = {
  generateServerVariableString: function(config) {
    var env = config.serverVariables;

    if (typeof env === "undefined") {
      console.warn("You provided a {{content for 'server-variables'}} but didn't configure it for this environment.");
      return;
    }

    var serverVars   = env.defaults;
    var modulePrefix = env.tagPrefix || config.environment.modulePrefix;

    var metaString = '';
    for(var key in serverVars) {
      metaString  = metaString + "\n<meta name='" + modulePrefix + "-" + key + "'content='" + serverVars[key] + "'>";
    }

    return metaString;
  }
};
