import { run } from '@ember/runloop';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';
import ENV from 'dummy/config/environment';
import {
  setPrefix,
  getAllServerVars,
  getServerVar
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
    run(application, 'destroy');
  }
});

test('it appends all the variables defined in the environment file', function(assert) {
  visit('/');

  andThen(function() {
    var tags = getAllServerVars();
    assert.equal(tags.length, 4);

    var tokenTag = getServerVar('token');
    assert.equal(tokenTag.attr('content'), 'example');

    var locationTag = getServerVar('location');
    assert.equal(locationTag.attr('content'), 'Denver');

    var fooTag = getServerVar('foo');
    assert.equal(fooTag.attr('content'), 'bar');

    var fooBarBazTag = getServerVar('foo-bar-baz');
    assert.equal(fooBarBazTag.attr('content'), '');
  });
});

test('it can read properties as a computed one-way', function(assert) {
  visit('/');

  andThen(function() {
    var indexController = application.__container__.lookup('controller:index');
    assert.equal(indexController.get('token'), 'example');
  });
});
