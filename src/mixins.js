import std from 'std';

// mixins are functions that take an object a return a new instance of that
// object after having applied an arbitrary transformation on it.
//    f(old) -> new
// eg.

function mix(...transforms) {
  var r = {};

  for (const transform of transforms) {
    switch (typeof(transform)) {
    case "object":
      r = Object.assign({}, r, transform);
      break;
    case "function":
      r = transform(r);
    }
  }

  return r;
}
