var _ = require('lodash');

module.exports = function locale(source, name) {
  if (!(source instanceof Object)) {
    throw new Error('The source is not an object.');
  }
  source = Array.isArray(source) ? source : [source];

  var reduceKeys = function(namespace, collection) {
    var iteratee = function(keys, value, key) {
      var nextNamespace = namespace + key;
      if (value instanceof Object) {
        var subKeys = reduceKeys(nextNamespace + '.', value);
        keys = keys.concat(subKeys);
      } else {
        keys = keys.concat([nextNamespace]);
      }

      return keys;
    };

    return _.reduce(collection, iteratee, []);
  };

  return {
    source: source,
    name: name,

    keys: function() {
      return _(source)
        .map(function(src) { return reduceKeys('', src); })
        .flatten()
        .value();
    }
  };
};
