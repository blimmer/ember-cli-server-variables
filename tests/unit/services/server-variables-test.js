import {
  moduleFor,
  test
} from 'ember-qunit';
import {
  setPrefix,
  addHeadTag,
  cleanupHeadTag
} from '../../helpers/head-tags';
import ENV from 'dummy/config/environment';

moduleFor('service:server-variables', {
  // Specify the other units that are required for this test.
  beforeEach() {
    setPrefix(ENV.serverVariables.tagPrefix);
  }
});

test('it returns the tag content when found', function(assert) {
  addHeadTag('service-test-location', 'Denver');

  const service = this.subject();
  assert.equal(service.get('serviceTestLocation'), 'Denver');

  cleanupHeadTag('service-test-location');
});

test('it returns undefined when the content is not found', function(assert) {
  const service = this.subject();
  assert.equal(service.get('nonExistant'), undefined);
});

test('it returns undefined when content is not set', function(assert) {
  addHeadTag('service-test-foo', '');

  const service = this.subject();
  assert.equal(service.get('serviceTestFoo'), undefined);

  cleanupHeadTag('service-test-foo');
});

test('it accepts dasherized or camelcased', function(assert) {
  addHeadTag('service-test-foo', 'something');

  const service = this.subject();
  assert.equal(service.get('serviceTestFoo'), 'something');
  assert.equal(service.get('service-test-foo'), 'something');

  cleanupHeadTag('service-test-foo');
});

test('it parses JSON tags', function(assert) {
  addHeadTag('service-test-json', JSON.stringify({ foo: 'foo', bar: 'bar' }));

  const service = this.subject();
  const res = service.get('service-test-json');
  assert.deepEqual(res, { foo: 'foo', bar: 'bar' });
  assert.equal(typeof res, 'object');
  assert.notEqual(typeof res, 'string');
});
