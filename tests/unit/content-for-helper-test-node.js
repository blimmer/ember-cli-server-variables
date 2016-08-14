/* jshint -W030 */
/* jshint node: true */
var expect = require('chai').expect;
var contentForHelper = require('../../lib/content-for-helper');

describe('content-for-helper', function() {
  describe('generateServerVariableString', function() {
    var generateServerVariableString = contentForHelper.generateServerVariableString;

    it('returns undefined if you don\'t pass a serverVariables config', function() {
      expect(generateServerVariableString({modulePrefix: 'foo'})).to.be.undefined;
    });

    it('returns undefined if you don\'t pass an array of server variables', function() {
      expect(generateServerVariableString({
        serverVariables: {
          vars: {foo: 'foo'}
        }
      })).to.be.undefined;
    });

    it('generates a string of server variable configs', function() {
      var res = generateServerVariableString({
        serverVariables: {
          tagPrefix: 'my-app',
          vars: ['foo', 'bar']
        }
      });

      expect(res).to.equal("\n<meta name='my-app-foo'content=''>\n<meta name='my-app-bar'content=''>");
    });

    it('uses modulePrefix if tagPrefix is not provided', function() {
      var res = generateServerVariableString({
        modulePrefix: 'my-app',
        serverVariables: {
          vars: ['foo', 'bar']
        }
      });

      expect(res).to.equal("\n<meta name='my-app-foo'content=''>\n<meta name='my-app-bar'content=''>");
    });

    it('tagPrefix overrides modulePrefix if provided', function() {
      var res = generateServerVariableString({
        modulePrefix: 'other-prefix',
        serverVariables: {
          tagPrefix: 'my-app',
          vars: ['foo', 'bar']
        }
      });

      expect(res).to.equal("\n<meta name='my-app-foo'content=''>\n<meta name='my-app-bar'content=''>");
    });
  });
});
