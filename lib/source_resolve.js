var _      = require('lodash');
var path   = require('path');
var glob   = require('glob');
var Locale = require('../lib/locale');

var SourceResolve = function(options) {
  this.options = _.defaults(options, {
    prefix: false,
    locales: [],
    respath: './locales/__LOCALE__/**/*.json'
  });
};

module.exports = SourceResolve;

SourceResolve.prototype.locales = function() {
  return _.map(this.options.locales, function(l) {
    return new Locale(this.translations(l), l);
  }.bind(this));
};

SourceResolve.prototype.files = function(name) {
  return glob.sync(this.options.respath.replace('__LOCALE__', name));
};

SourceResolve.prototype.translations = function(name) {
  return _.map(this.files(name), function(file) {
    var translations = require(path.resolve(file));
    var ret;

    if (this.options.prefix) {
      var basename = path.basename(file, '.json');
      ret = {};
      ret[basename] = translations;
    } else {
      ret = translations;
    }

    return ret;
  }.bind(this));
};
