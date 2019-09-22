export default function (obj, predicate) {
  var result = {},
    key;
  for (key in obj) {
    if (predicate !== key) {
      result[key] = obj[key];
    }
  }
  return result;
};