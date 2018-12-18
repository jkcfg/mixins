import { patch, patches } from '../src/mixins';

test('trivial patch', () => {
  expect(patch({}, {})).toEqual({});
});
