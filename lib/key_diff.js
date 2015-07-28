var _ = require('lodash');

module.exports = function keyDiff(locales) {
  if (!Array.isArray(locales)) {
    throw new Error('Locales must be an array.');
  }

  var _keys = null;

  return {
    locales: locales,

    keys: function() {
      if (_keys) { return _keys; }

      _keys = _.union(_.flatten(_.map(locales, function(locale) {
        return locale.keys();
      })));
      _keys.sort();

      return _keys;
    },

    diff: function(locale) {
      if (locales.indexOf(locale) === -1) {
        throw new Error('Locale is not available.');
      }

      return _.difference(this.keys(), locale.keys());
    },

    isDirty: function() {
      return _.some(locales, function(locale) {
        return this.diff(locale).length > 0;
      }.bind(this));
    },

    report: function(reporter) {
      reporter.print(this);
    }
  };
};
