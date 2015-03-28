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

function getAllServerVars() {
  return Ember.$(`head meta[name^=${prefix}]`);
}

function getServerVar(name) {
  return Ember.$(`head meta[name^=${prefix}-${name}]`);
}

export {
  setPrefix,
  getAllServerVars,
  getServerVar,
  cleanupHeadTag,
  addHeadTag
};
