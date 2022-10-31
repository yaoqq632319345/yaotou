test('add', () => {
  expect(2 + 2).toBe(4);
});

test('boolean', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test('number', () => {
  expect(2).toBeGreaterThan(1);
  expect(2).toBeLessThan(3);
});

test('obj', () => {
  expect({ name: 'aaa' }).toEqual({ name: 'aaa' });
});
