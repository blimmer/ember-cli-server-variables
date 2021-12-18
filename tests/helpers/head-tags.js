var prefix = null;
function setPrefix(definedPrefix) {
  prefix = definedPrefix;
}

function addHeadTag(name, content) {
  var meta = document.createElement('meta');
  meta.name = `${prefix}-${name}`;
  meta.content = content;
  document.querySelector('head').append(meta);
}

function cleanupHeadTag(name) {
  document.querySelector(`head meta[name=${prefix}-${name}]`).remove();
}

function getAllServerVars() {
  return document.querySelectorAll(`head meta[name^=${prefix}]`);
}

function getServerVar(name) {
  var tag = document.querySelector(`head meta[name^=${prefix}-${name}]`);
  if (tag) {
    return tag.content;
  }

  return null;
}

export {
  setPrefix,
  getAllServerVars,
  getServerVar,
  cleanupHeadTag,
  addHeadTag,
};
