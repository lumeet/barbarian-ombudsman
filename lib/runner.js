var source = require('./source_resolve');
var keyDiff = require('./key_diff');
var report = require('./report');

module.exports = function runner(options) {
  return {
    invoke: function() {
      var locales = source(options).locales();
      var diff = keyDiff(locales);
      report(diff);

      return !diff.isDirty();
    }
  };
};

