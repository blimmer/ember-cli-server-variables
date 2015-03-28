import Ember from 'ember';

var prefix = null;
function setPrefix(definedPrefix) {
  prefix = definedPrefix;
}

function addHeadTag(name, content) {
  var tag = `<meta name='${prefix}-${name}' content='${content}'>`;
  Ember.$('head').append(tag);
}

function cleanupHeadTag(name) {
  Ember.$(`head meta[name=${prefix}-${name}]`).remove();
}

function assertServerVarPresent(assert, name, content) {
  var tag = Ember.$(`head meta[name=${name}]`);
  assert(tag.attr(name)).equals(name);
  assert(tag.attr(content)).equals(content);
}

function getAllServerVars() {
  return Ember.$(`head meta[name^=${prefix}]`);
}

function getServerVar(name) {
  return Ember.$(`head meta[name^=${prefix}-${name}]`);
}

export {
  setPrefix,
  assertServerVarPresent,
  getAllServerVars,
  getServerVar,
  cleanupHeadTag,
  addHeadTag
};
