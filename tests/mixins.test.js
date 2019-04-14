import { mix, patch, patches } from '../src/mixins';

test('mix objects', () => {
  const r = mix({foo: 1}, {bar: 2}, {foo: 3});

  expect(r).toEqual({
    foo: 3,
    bar: 2
  });
});

test('mix transforms', () => {
  const addLabel = (k, v) => {
    const labels = {};
    labels[k] = v;
    return o => patch(o, { labels });
  };
  const orig = { foo: 1, labels: { l1: 'v1', l2: 'v2' } };

  expect(mix(orig, addLabel('l3', 'v3'), addLabel('l1', 'w1'))).toEqual({
    foo: 1,
    labels: {
      l1: 'w1',
      l2: 'v2',
      l3: 'v3',
    }
  });

  // orig has been left untouched.
  expect(orig).toEqual(
    { foo: 1, labels: { l1: 'v1', l2: 'v2' } }
  );
});

test('trivial patch', () => {
  expect(patch({}, {})).toEqual({});
  expect(patch({}, {foo: 1})).toEqual({foo: 1});
  expect(patch({}, {foo: {bar: "baz"}})).toEqual({foo: {bar: "baz"}});
  expect(patch({foo: 1}, {foo: {bar: "baz"}})).toEqual({foo: {bar: "baz"}});
});

test('nested patch', () => {
  const orig = {
    foo: {bar: 1},
    baz: 2
  };
  
  expect(patch(orig, {foo: {bar: 3}})).toEqual(
    {
      foo: {bar: 3},
      baz: 2
    }
  );

  expect(patch(orig, {foo: {bar: 3, baz: 4}})).toEqual(
    {
      foo: {bar: 3, baz: 4},
      baz: 2
    }
  );

  // orig has been left untouched.
  expect(orig).toEqual({
    foo: {bar: 1},
    baz: 2
  });
});

test('patches', () => {
  const tx = patches({foo: 1}, {bar: 2}, {foo: 3});

  expect(tx({})).toEqual({
    foo: 3,
    bar: 2
  });
});

test("array patch", () => {
  const orig = {
    foo: { bar: 1, ary: ["foo"] },
    baz: 2
  };

  expect(patch(orig, { foo: { bar: 3, ary: ["bar"] } })).toEqual({
    foo: { bar: 3, ary: ["bar"] },
    baz: 2
  });

  // orig has been left untouched.
  expect(orig).toEqual({
    foo: { bar: 1, ary: ["foo"] },
    baz: 2
  });
});
