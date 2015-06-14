var _ = require('lodash');

var Locale = function(source, name) {
  if (!(source instanceof Object)) {
    throw new Error('The source is not an object.');
  }

  this.source = Array.isArray(source) ? source : [source];
  this.name = name;

  return this;
};

module.exports = Locale;

Locale.iteratee = function(keys, value, key) {
  var fullKey = this.current === null ? '' : this.current + '.';
  fullKey += key;
  if (value instanceof Object) {
    var subKeys = _.reduce(value, Locale.iteratee, [], { current: fullKey });
    keys = keys.concat(subKeys);
  } else {
    keys.push(fullKey);
  }

  return keys;
};

Locale.prototype.keys = function() {
  return _.flatten(_.map(this.source, function(src) {
    return _.reduce(src, Locale.iteratee, [], { current: null });
  }));
};
