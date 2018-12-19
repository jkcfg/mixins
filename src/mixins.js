// mixins are functions that take an object a return a new instance of that
// object after having applied an arbitrary transformation on it.
//    f(old) -> new
// eg.

function mix(...transforms) {
  let r = {};

  for (const transform of transforms) {
    switch (typeof transform) {
    case 'object':
      r = Object.assign({}, r, transform);
      break;
    case 'function':
      r = transform(r);
      break;
    default:
      throw new TypeError('only objects and functions allowed as arguments');
    }
  }

  return r;
}

// patch returns a new value that has the fields of `obj`, except
// where overridden by values in `patchObj`.
function patch(obj, patchObj) {
  switch (typeof obj) {
  case 'object': {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k in patchObj) {
        result[k] = patch(v, patchObj[k]);
      } else {
        result[k] = v;
      }
    }
    for (const [pk, pv] of Object.entries(patchObj)) {
      if (!(pk in obj)) {
        result[pk] = pv;
      }
    }
    return result;
  }
  case 'string':
  case 'number':
  case 'boolean':
    return patchObj;
  default:
    throw new Error(`unhandled patch case: ${typeof obj}`);
  }
}

// patches makes a transformation that will structurally patch the
// value using the objects supplied.
function patches(...ps) /* transform */ {
  return (obj) => {
    let o = obj;
    for (const p of ps) {
      o = patch(o, p);
    }
    return o;
  };
}

export { patch, patches, mix };
