/*jshint node:true*/
module.exports = {

  normalizeEntityName: function() { },

  afterInstall: function() {
    return this.insertIntoFile('app/index.html', '    {{content-for "server-variables"}}', {
      before: '  </head>',
    });
  }
};
