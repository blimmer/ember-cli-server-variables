import $ from 'jquery';

var prefix = null;
function setPrefix(definedPrefix) {
  prefix = definedPrefix;
}

function addHeadTag(name, content) {
  var tag = `<meta name='${prefix}-${name}' content='${content}'>`;
  $('head').append(tag);
}

function cleanupHeadTag(name) {
  $(`head meta[name=${prefix}-${name}]`).remove();
}

function getAllServerVars() {
  return $(`head meta[name^=${prefix}]`);
}

function getServerVar(name) {
  return $(`head meta[name^=${prefix}-${name}]`);
}

export {
  setPrefix,
  getAllServerVars,
  getServerVar,
  cleanupHeadTag,
  addHeadTag
};
