var source   = require('./source_resolve');
var keyDiff  = require('./key_diff');
var reporter = require('./reporter');

module.exports = function runner(options) {
  return {
    invoke: function() {
      var locales = source(options).locales();
      var diff = keyDiff(locales);
      diff.report(reporter());

      return !diff.isDirty();
    }
  };
};

