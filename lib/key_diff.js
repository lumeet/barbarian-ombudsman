_ = require('lodash');

var KeyDiff = function(locales) {
  if (!Array.isArray(locales)) {
    throw new Error('Locales must be an array.');
  }

  this.locales = locales;
};

KeyDiff.prototype.keys = function() {
  if (this._keys) { return this._keys; }

  var keys = _.union(_.flatten(_.map(this.locales, function(locale) {
    return locale.keys();
  })));
  keys.sort();

  this._keys = keys;
  return this._keys;
};

KeyDiff.prototype.diff = function(locale) {
  if (this.locales.indexOf(locale) == -1) {
    throw new Error('Locale is not available.');
  }

  return _.difference(this.keys(), locale.keys());
};

KeyDiff.prototype.isDirty = function() {
  return _.some(this.locales, function(locale) {
    return this.diff(locale).length > 0;
  }.bind(this));
};

KeyDiff.prototype.report = function(reporter) {
  reporter.print(this);
};

module.exports = KeyDiff;
