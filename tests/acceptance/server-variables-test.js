import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';
import ENV from 'dummy/config/environment';
import {
  setPrefix,
  assertServerVarPresent,
  getAllServerVars
} from '../helpers/head-tags';

var application;

// All Server Variables for these tests are configured in the dummy app's
// environment.js file.
module('Acceptance: ServerVariables', {
  beforeEach: function() {
    application = startApp();
    setPrefix(ENV.serverVariables.tagPrefix);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('it appends all the variables defined in the environment file', function(assert) {
  visit('/');

  andThen(function() {
    var tags = getAllServerVars();
    assert.equal(tags.length, 3);
  });
});
