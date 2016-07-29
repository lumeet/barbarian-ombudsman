var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var locale = require('../lib/locale');

module.exports = function sourceResolve(options) {
  options = _.defaults(options, {
    prefix: false,
    locales: [],
    respath: './locales/__LOCALE__/**/*.json'
  });

  var files = function(name) {
    return glob.sync(options.respath.replace('__LOCALE__', name));
  };

  var translations = function(name) {
    return _.map(files(name), function(file) {
      var translations = require(path.resolve(file));
      var ret;

      if (options.prefix) {
        var basename = path.basename(file, '.json');
        ret = {};
        ret[basename] = translations;
      } else {
        ret = translations;
      }

      return ret;
    });
  };

  return {
    options: options,

    locales: function() {
      return _.map(options.locales, function(l) {
        return locale(translations(l), l);
      });
    },
  };
};
