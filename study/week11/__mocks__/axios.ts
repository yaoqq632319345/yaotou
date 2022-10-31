// jest模拟 npm 包
const axios = {
  get: jest.fn(() => Promise.resolve({ data: { username: 'mock folder' } })),
};
export default axios;
