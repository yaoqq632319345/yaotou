const fetchMethod = (cb: (a: string) => void) => {
  setTimeout(() => {
    cb('hello');
  }, 100);
};
it('cb', (done) => {
  fetchMethod((data) => {
    expect(data).toBe('hello');
    done();
  });
});

const p = () => Promise.resolve('hello');

it('promise', () => {
  return p().then((data) => {
    expect(data).toBe('hello');
  });
});
it('async', async () => {
  const res = await p();
  expect(res).toBe('hello');
});

it('expect', () => {
  return expect(p()).resolves.toBe('hello');
});

const preject = () => Promise.reject('error');
it('reject', () => {
  return expect(preject()).rejects.toBe('error');
});
