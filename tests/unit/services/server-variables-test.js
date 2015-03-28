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
  // needs: ['service:foo']
});

test('it returns the tag content when found', function(assert) {
  setPrefix(ENV.serverVariables.tagPrefix);
  addHeadTag('service-test-location', 'Denver');

  var service = this.subject();
  assert.equal(service.get('serviceTestLocation'), 'Denver');

  cleanupHeadTag('service-test-location');
});

test('it returns undefined when the content is not found', function(assert) {
  setPrefix(ENV.serverVariables.tagPrefix);

  var service = this.subject();
  assert.equal(service.get('nonExistant'), undefined);
});

test('it returns undefined when content is not set', function(assert) {
  setPrefix(ENV.serverVariables.tagPrefix);
  addHeadTag('service-test-foo', '');

  var service = this.subject();
  assert.equal(service.get('serviceTestFoo'), undefined);

  cleanupHeadTag('service-test-foo');
});

test('it accepts dasherized or camelcased', function(assert) {
  setPrefix(ENV.serverVariables.tagPrefix);
  addHeadTag('service-test-foo', 'something');

  var service = this.subject();
  assert.equal(service.get('serviceTestFoo'), 'something');
  assert.equal(service.get('service-test-foo'), 'something');

  cleanupHeadTag('service-test-foo');
});
