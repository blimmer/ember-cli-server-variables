import { visit } from '@ember/test-helpers';
import {
  module,
  test
} from 'qunit';
import ENV from 'dummy/config/environment';
import {
  setPrefix,
  getAllServerVars,
  getServerVar
} from '../helpers/head-tags';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance: ServerVariables', function (hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(function() {
    setPrefix(ENV.serverVariables.tagPrefix);
  });

  test('it appends all the variables defined in the environment file', async function(assert) {
    await visit('/');

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

  test('it can read properties as a computed one-way', async function(assert) {
    await visit('/');

    var indexController = this.owner.lookup('controller:index');
    assert.equal(indexController.get('token'), 'example');
  });
});
