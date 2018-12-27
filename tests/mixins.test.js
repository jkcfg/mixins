import { patch, patches } from '../src/mixins';

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
