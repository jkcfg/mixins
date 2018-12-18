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

// patches makes a transformation that will structurally patch the
// value using the objects supplied.
function patches(...patch) /* transform */ {
  return function(obj) {
    let o = obj;
    for (const p of patch) {
      o = patch(o, p);
    }
    return o;
  }
}

// patch returns a new value that has the fields of `obj`, except
// where overridden by values in `patchObj`.
function patch(obj, patchObj) {
  switch (typeof obj) {
  case 'object': {
    const result = {};
    for (const k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      if (k in patchObj) {
        result[k] = patch(v, patchObj[k]);
      } else {
        result[k] = v;
      }
    }
    return result;
  }
  case 'string', 'number', 'boolean':
    return patchObj;
  default:
    throw new Error('unhandled patch case: ' + (typeof obj));
  }
}

export { patch, patches, mix };
