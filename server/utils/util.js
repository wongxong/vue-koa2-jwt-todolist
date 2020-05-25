

function cached (fn) {
  var cache = Object.create(null);
  return function(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /[-_](\w)/g;

const camelize = cached(function(str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

const capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

module.exports = {
  cached,
  camelize,
  capitalize
};