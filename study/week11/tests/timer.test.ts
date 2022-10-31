type normalFn = (s: string) => void;
const fetchUser = (cb: normalFn) => {
  setTimeout(() => {
    cb('hello');
  }, 1000);
};

const loopFetchUser = (cb: normalFn) => {
  setTimeout(() => {
    cb('1');
    setTimeout(() => {
      cb('2');
    }, 2000);
  }, 1000);
};

/**
 * 解决无法expect(setTimeout)
 * setTimeout value must be a mock or spy function when mocking
 * // jest.useFakeTimers({ legacyFakeTimers: true });
 */
jest.useFakeTimers();
it('test timer', () => {
  const cb = jest.fn();
  fetchUser(cb);
  expect(cb).not.toHaveBeenCalled();
  // expect(setTimeout).toHaveBeenCalledTimes(1);
  jest.runAllTimers();
  expect(cb).toHaveBeenCalled();
  expect(cb).toHaveBeenCalledWith('hello');
});
it('test timer loops', () => {
  const cb = jest.fn();
  loopFetchUser(cb);
  expect(cb).not.toHaveBeenCalled();
  // 这个setTimeout的测试受到了其他测试的影响
  // expect(setTimeout).toHaveBeenCalledTimes(2);
  jest.runOnlyPendingTimers();
  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb).toHaveBeenLastCalledWith('1');
  jest.runOnlyPendingTimers();
  expect(cb).toHaveBeenCalledTimes(2);
  expect(cb).toHaveBeenLastCalledWith('2');
});
it('test timer loops use exact time', () => {
  const cb = jest.fn();
  loopFetchUser(cb);
  expect(cb).not.toHaveBeenCalled();
  // 推进500ms
  jest.advanceTimersByTime(500);
  expect(cb).not.toHaveBeenCalled();
  jest.advanceTimersByTime(500);
  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb).toHaveBeenLastCalledWith('1');
  jest.advanceTimersByTime(2000);
  expect(cb).toHaveBeenCalledTimes(2);
  expect(cb).toHaveBeenLastCalledWith('2');
});
