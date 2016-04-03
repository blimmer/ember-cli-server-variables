/*jshint node:true*/
module.exports = {
  afterInstall: function() {
    return this.insertIntoFile('app/index.html', '    {{content-for "server-variables"}}', {
      before: '  </head>',
    });
  }
};
