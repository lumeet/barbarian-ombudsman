var _ = require('lodash');

module.exports = function keyDiff(locales) {
  if (!Array.isArray(locales)) {
    throw new Error('Locales must be an array.');
  }

  var _keys;
  var keys = function() {
    if (_keys) { return _keys; }

    _keys = _(locales)
      .map(function(locale) { return locale.keys(); })
      .flatten()
      .union()
      .value();
    _keys.sort();

    return _keys;
  };

  var diff = function(locale) {
    if (locales.indexOf(locale) === -1) {
      throw new Error('Locale is not available.');
    }

    return _.difference(keys(), locale.keys());
  };

  return {
    locales: locales,
    keys: keys,
    diff: diff,

    isDirty: function() {
      return _.some(locales, function(locale) {
        return diff(locale).length > 0;
      });
    }
  };
};
