import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import ENV from 'dummy/config/environment';
import {
  setPrefix,
  getAllServerVars,
  getServerVar,
} from '../helpers/head-tags';
import { setupApplicationTest } from 'dummy/tests/helpers';

module('Acceptance: ServerVariables', function (hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(function () {
    setPrefix(ENV.serverVariables.tagPrefix);
  });

  test('it appends all the variables defined in the environment file', async function (assert) {
    await visit('/');

    var tags = getAllServerVars();
    assert.strictEqual(tags.length, 4);

    var tokenVar = getServerVar('token');
    assert.strictEqual(tokenVar, 'example');

    var locationVar = getServerVar('location');
    assert.strictEqual(locationVar, 'Denver');

    var fooVar = getServerVar('foo');
    assert.strictEqual(fooVar, 'bar');

    var fooBarBazVar = getServerVar('foo-bar-baz');
    assert.strictEqual(fooBarBazVar, '');
  });

  test('it can read properties as a computed one-way', async function (assert) {
    await visit('/');

    var indexController = this.owner.lookup('controller:index');
    assert.strictEqual(indexController.get('token'), 'example');
  });
});
