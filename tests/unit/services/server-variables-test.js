import { module, test } from 'qunit';
import { setupTest } from 'dummy/tests/helpers';
import { setPrefix, addHeadTag, cleanupHeadTag } from '../../helpers/head-tags';
import ENV from 'dummy/config/environment';

module('service:server-variables', function (hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  hooks.beforeEach(function () {
    setPrefix(ENV.serverVariables.tagPrefix);
  });

  test('it returns the tag content when found', function (assert) {
    addHeadTag('service-test-location', 'Denver');

    const service = this.owner.lookup('service:server-variables');
    assert.strictEqual(service.get('serviceTestLocation'), 'Denver');

    cleanupHeadTag('service-test-location');
  });

  test('it returns undefined when the content is not found', function (assert) {
    const service = this.owner.lookup('service:server-variables');
    assert.strictEqual(service.get('nonExistant'), undefined);
  });

  test('it returns undefined when content is not set', function (assert) {
    addHeadTag('service-test-foo', '');

    const service = this.owner.lookup('service:server-variables');
    assert.strictEqual(service.get('serviceTestFoo'), undefined);

    cleanupHeadTag('service-test-foo');
  });

  test('it accepts dasherized or camelcased', function (assert) {
    addHeadTag('service-test-foo', 'something');

    const service = this.owner.lookup('service:server-variables');
    assert.strictEqual(service.get('serviceTestFoo'), 'something');
    assert.strictEqual(service.get('service-test-foo'), 'something');

    cleanupHeadTag('service-test-foo');
  });

  test('it parses JSON tags', function (assert) {
    addHeadTag('service-test-json', JSON.stringify({ foo: 'foo', bar: 'bar' }));

    const service = this.owner.lookup('service:server-variables');
    const res = service.get('service-test-json');
    assert.deepEqual(res, { foo: 'foo', bar: 'bar' });
    assert.strictEqual(typeof res, 'object');
    assert.notEqual(typeof res, 'string');
  });
});
