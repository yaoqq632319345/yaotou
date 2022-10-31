function mock(shoudCall: boolean, cb: (a: any) => void) {
  if (shoudCall) cb(1);
}
it('mock', () => {
  const mockCb = jest.fn();
  mock(true, mockCb);
  expect(mockCb).toHaveBeenCalled();
  expect(mockCb).toHaveBeenCalledWith(1);
  expect(mockCb).toHaveBeenCalledTimes(1);
  // console.log(mockCb);
});

it('mock implement', () => {
  const mockCb = jest.fn().mockReturnValue(2);
  mock(true, mockCb);
  expect(mockCb).toHaveBeenCalledWith(1);
  expect(mockCb.mock.results[0].value).toBe(2);
});
