import Ember from 'ember';

var prefix = null;
function setPrefix(definedPrefix) {
  prefix = definedPrefix;
}

function cleanupHeadTags() {
  getAllServerVars().remove();
}

function assertServerVarPresent(assert, name, content) {
  var tag = Ember.$(`head meta[name=${name}]`);
  assert(tag.attr(name)).equals(name);
  assert(tag.attr(content)).equals(content);
}

function getAllServerVars() {
  return Ember.$(`head meta[name^=${prefix}]`);
}

export { setPrefix, cleanupHeadTags, assertServerVarPresent, getAllServerVars };
