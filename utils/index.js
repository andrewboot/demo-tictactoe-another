function stripNulls(arr) {
  return arr.filter(a => a != null);
}

function execIfFunc(x) {
  return typeof x === 'function' ? x() : x;
}

function ifElse(condition) {
  return (then, or) => (execIfFunc(condition) ? execIfFunc(then) : execIfFunc(or));
}

module.exports = {
  stripNulls,
  execIfFunc,
  ifElse,
};
