var _ = require('lodash');

module.exports = function locale(source, name) {
  if (!(source instanceof Object)) {
    throw new Error('The source is not an object.');
  }
  source = Array.isArray(source) ? source : [source];

  var iteratee = function(keys, value, key) {
    var fullKey = this.current === null ? '' : this.current + '.';
    fullKey += key;
    if (value instanceof Object) {
      var subKeys = _.reduce(value, iteratee, [], {
        current: fullKey
      });
      keys = keys.concat(subKeys);
    } else {
      keys.push(fullKey);
    }

    return keys;
  };

  return {
    source: source,
    name: name,

    keys: function() {
      return _.flatten(_.map(source, function(src) {
        return _.reduce(src, iteratee, [], { current: null });
      }));
    }
  };
};
