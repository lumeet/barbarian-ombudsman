var _ = require('lodash');
var colors = require('colors');

module.exports = function report(keyDiff) {
  var printLocaleDiff = function(diff, name) {
    if (diff.length > 0) {
      console.error(
        colors.white(
          'The following translations seem to be missing from \'') +
        colors.red(name) +
        colors.white('\':')
      );

      _.each(diff, function(key) {
        console.error(colors.bold.red('  \u2717 ' + key));
      });
    }
  };

  console.log('Found ' + keyDiff.keys().length + ' keys in total.\n');

  _.each(keyDiff.locales, function(locale) {
    printLocaleDiff(keyDiff.diff(locale), locale.name);
  });

  console.log();
};
